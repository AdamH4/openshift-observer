const DB = require("./database/queries")
const { DATABASES, OPERATIONS } = require("./database/databaseMapper")
const axios = require('axios')
const { validNames, yamlToJson } = require("./utils/openApi")

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

const getOpenApiFile = async (objects) => {
    for (const item of objects) {
        if (validNames.includes(item.name)) {
            const response = await axios.get(item.download_url)
            return response.data
        }
    }
}

// create api endpoint from repo url
const parseGithubURL = (repoURL) => {
    const pathSections = new URL(repoURL).pathname.split("/")
    const repoOwner = pathSections[1]
    const repoName = pathSections[2]
    return `https://api.github.com/repos/${repoOwner}/${repoName}/contents`
}

// parse data from build
const parseBuild = (build) => {
    const buildName = build.metadata.labels["openshift.io/build.name"]
    return {
        uid: build.metadata.uid,
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
        url: `http://${replica.metadata.labels.app}-${replica.metadata.namespace}.apps-crc.testing`,
        cluster_name: replica.metadata.namespace,
        status_message: replica.status.phase,
        creation_timestamp: replica.metadata.creationTimestamp,
        replicaset_count: 0,
        specification: {},
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
            } else if (operation === OPERATIONS.UPDATE) {
                await DB.updateEntity(pod, DATABASES.POD, "uid")
                await DB.updateEntity(containers, DATABASES.CONTAINER, "uid")
                await DB.updateEntity(ports, DATABASES.PORT, "uid")
            }
            break
        case "Build":
            const build = parseBuild(entity)
            const repoContentURL = parseGithubURL(build.build_source)
            let res
            try {
                res = await axios.get(repoContentURL)
            } catch (e) {
                console.error(e)
            }
            const yamlFile = await getOpenApiFile(res.data)
            const specification = yamlToJson(yamlFile)
            const pods = await DB.getSpecificPod({ name: build.pod_name })
            if (pods.length) {
                //TODO setInverval here and repeatively check if pods exists
            }
            await DB.updatePodSpecification({ name: build.pod_name }, { specification })
            // if (operation === OPERATIONS.INSERT) {
            //     await DB.insertEntity(build, DATABASES.BUILD)
            // } else if (operation === OPERATIONS.UPDATE) {
            //     await DB.updateEntity(build, DATABASES.BUILD, { uid: build.uid })
            // }

            break
        default:
            console.log("Default -> in switch")
            break
    }
}


module.exports = {
    parseAndStoreEntityFromJson
}