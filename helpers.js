const DB = require("./database/queries")
const { DATABASES } = require("./database/databaseMapper")

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
    const pod = {
        uid: replica.metadata.uid,
        name: replica.metadata.labels.app,
        url: `http://${replica.metadata.labels.app}-${replica.metadata.namespace}.apps-crc.testing`,
        cluster_name: replica.metadata.namespace,
        status_message: replica.status.phase,
        creation_timestamp: replica.metadata.creationTimestamp,
        replicaset_count: 0,
        specification: JSON.stringify({ a: "aaeeeea" })
    }
    const containers = replica.spec.containers.map(container => {
        return {
            pod_uid: pod.uid,
            name: container.name,
        }
    })
    return { pod, containers }
}
//parse data from api and retrieve them
const parseAndStoreEntityFromJson = async (entity) => {
    const entityKind = entity.metadata.ownerReferences[0] ? entity.metadata.ownerReferences[0].kind : "Unknown"
    switch (entityKind) {
        case "ReplicaSet":
            const { pod, containers } = parseReplicaSet(entity)
            // const uid = await DB.insertEntity(pod, DATABASES.POD, "name")
            const response = await DB.insertEntity(containers, DATABASES.CONTAINER, ["pod_uid", "id"])
            // console.log(response)
            // containers.forEach(async (container) => {
            //     const containerResponse = await DB.insertEntity(container, DATABASES.CONTAINER)
            //     console.log(containerResponse)
            //     container.pods.forEach(async (port) => {
            //         await DB.insertEntity({
            //             container_id: container.,
            //             port: port.containerPort,
            //             protocol_name: port.protocol
            //         }, DATABASES.PORT)
            //     })
            // })
            break
        case "Build":
            console.log("Parse build")
            const build = parseBuild(entity)
            DB.insertEntity(build, DATABASES.BUILD)
            break
        default:
            console.log("Default -> in switch")
            break
    }
}


module.exports = {
    parseAndStoreEntityFromJson
}