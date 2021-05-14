const { DATABASES, OPERATIONS } = require("./database/databaseMapper")
const axios = require('axios')
const { validNames, yamlToJson } = require("./utils/openApi")
const { Octokit } = require('@octokit/rest')
const DB = require('./database/queries')

// get build repo URL and return it defaults to empty string ("")
const findBuildRepoURL = (build) => {
    let URL = ''
    build.spec.initContainers.forEach(containerInit => {
        if (containerInit.name === 'git-clone') {
            containerInit.env.forEach(enviroment => {
                if (enviroment.name === "SOURCE_REPOSITORY") URL = enviroment.value
            })
        }
    })
    return URL
}

// find openApi in github folder and retrieve it 
const getOpenApiFile = async (objects) => {
    for (const item of objects) {
        console.log(item.download_url)
        if (validNames.includes(item.name)) {
            const response = await axios.get(item.download_url)
            return response.data
        }
    }
    return null
}

const getBuildOpenApiSpecification = async (repoURL) => {
    const [owner, name] = parseGithubURL(repoURL)
    let res
    try {
        const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
        res = await octokit.request('GET /repos/:owner/:repo/contents', {
            owner: owner,
            repo: name
        })
    } catch (e) {
        return {}
    }
    if (res && res.data && res.data.length) {
        const yamlFile = await getOpenApiFile(res.data)
        if (yamlFile) return yamlToJson(yamlFile)
    }
    return {}
}

// create api endpoint from repo url
const parseGithubURL = (repoURL) => {
    const pathSections = new URL(repoURL).pathname.split("/")
    const repoOwner = pathSections[1]
    const repoName = pathSections[2]
    return [repoOwner, repoName]
}

// parse data from build
const parseBuild = (build) => {
    const buildName = build.metadata.labels["openshift.io/build.name"]
    return {
        uid: build.metadata.uid,
        full_name: build.metadata.name,
        pod_name: buildName.slice(0, buildName.lastIndexOf("-")),
        build_source: findBuildRepoURL(build),
        build_order: buildName.slice(buildName.lastIndexOf("-") + 1),
    }
}


// parse data from replicaSet
const parseReplicaSet = (replica) => {
    let ports = []
    let containers = []

    const pod = {
        uid: replica.metadata.uid,
        name: replica.metadata.labels.app,
        full_name: replica.metadata.name,
        url: `http://${replica.metadata.labels.app}-${replica.metadata.namespace}.apps-crc.testing`,
        cluster_name: replica.metadata.namespace,
        build_source: null,
        status_message: replica.status.phase,
        creation_timestamp: replica.metadata.creationTimestamp,
        replicaset_count: 0,
        specification: JSON.stringify({}),
    }
    replica.spec.containers.forEach(container => {
        const uid = pod.uid + "-container-" + container.name
        containers.push({
            uid: uid,
            pod_uid: pod.uid,
            name: container.name,
        })
        ports.push(...container.ports.map(port => {
            return {
                uid: `${uid}-port-${port.protocol}`,
                container_uid: uid,
                port: port.containerPort,
                protocol_name: port.protocol
            }
        }))
    })
    return { pod, containers, ports }
}
//parse data from api and retrieve them
const parseAndStoreEntityFromJson = async (entity, operation) => {
    const entityKind = entity.metadata.ownerReferences[0] ? entity.metadata.ownerReferences[0].kind : "Unknown"
    switch (entityKind) {
        case "ReplicaSet":
            const { pod, containers, ports } = parseReplicaSet(entity)
            if (operation === OPERATIONS.INSERT) {
                await DB.insertEntity(pod, DATABASES.POD)
                await DB.insertEntity(containers, DATABASES.CONTAINER)
                await DB.insertEntity(ports, DATABASES.PORT)
                console.log("Success insert")
            } else if (operation === OPERATIONS.UPDATE) {
                await DB.updateEntity(pod, DATABASES.POD, "uid")
                await DB.updateEntity(containers, DATABASES.CONTAINER, "uid")
                await DB.updateEntity(ports, DATABASES.PORT, "uid")
                console.log("Success update")
            } else if (operation === OPERATIONS.DELETE) {
                await DB.deleteEntity({ uid: pod.uid, full_name: pod.full_name }, DATABASES.POD)
                console.log("Success delete")
            }
            break
        case "Build":
            const build = parseBuild(entity)
            let retries = 5
            if (operation === OPERATIONS.DELETE) {
                await DB.deleteEntity({ uid: build.uid, full_name: build.full_name }, DATABASES.BUILD)
                console.log("Success delete")
                return
            }
            const waitingInterval = setInterval(async () => {
                const pods = await DB.getSpecificPod({ name: build.pod_name })
                if (pods && pods.length) { // pod exists
                    build.pod_uid = pods[0].uid
                    const specification = JSON.stringify(await getBuildOpenApiSpecification(build.build_source))
                    await DB.updatePodColumn({ name: build.pod_name }, { specification: specification, build_source: build.build_source })
                    if (operation === OPERATIONS.INSERT) {
                        await DB.insertEntity(build, DATABASES.BUILD)
                        console.log("Success insert")
                    } else if (operation === OPERATIONS.UPDATE) {
                        await DB.updateEntity(build, DATABASES.BUILD, { uid: build.uid })
                        console.log("Success update")
                    }
                    clearInterval(waitingInterval)
                }
                if (!retries) clearInterval(waitingInterval)
                retries--
            }, 2000)

            break
        default:
            console.log("Default -> in switch " + entityKind)
            break
    }
}

module.exports = {
    parseAndStoreEntityFromJson,
}