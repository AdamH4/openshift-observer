const DB = require("./database/queries")
const { DATABASES, OPERATIONS } = require("./database/databaseMapper")

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
    replica.spec.containers.forEach((container, index) => {
        const uid = pod.uid + "-" + container.name + "-" + index
        containers.push({
            uid: uid,
            pod_uid: pod.uid,
            name: container.name,
        })
        ports.push(...container.ports.map(port => {
            return {
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
                await DB.updateEntity(pod, DATABASES.POD, { uid: pod.uid })
                await DB.updateEntity(containers, DATABASES.CONTAINER)
                await DB.updateEntity(ports, DATABASES.PORT)
            }
            break
        case "Build":
            const build = parseBuild(entity)
            await operation(build, DATABASES.BUILD)
            break
        default:
            console.log("Default -> in switch")
            break
    }
}


module.exports = {
    parseAndStoreEntityFromJson
}