
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
        build_order: buildName.slice(buildName.lastIndexOf("-") + 1)
    }
}

// parse data from replicaSet
const parseReplicaSet = (replica) => {
    return {
        uid: replica.metadata.uid,
        name: replica.metadata.labels.app,
        cluster: replica.metadata.namespace,
        creationTimestamp: replica.metadata.creationTimestamp,
        status: replica.status.phase,
        podLink: `http://${replica.metadata.labels.app}-${replica.metadata.namespace}.apps-crc.testing`,
        containers: replica.spec.containers.map(container => {
            return {
                containerName: container.name,
                ports: container.ports
            }
        }),
        replicaSetCount: 0,
        repoLink: "",
        buildsCount: 0,
    }
}
//parse data from api and retrieve them
const parseEntityFromJson = (entity) => {
    const entityKind = entity.metadata.ownerReferences[0] ? entity.metadata.ownerReferences[0].kind : "Unknown"
    switch (entityKind) {
        case "ReplicaSet":
            console.log("Parse replicaSet")
            const replicaSet = parseReplicaSet(entity)
            console.log(replicaSet)
            break
        case "Build":
            console.log("Parse build")
            const build = parseBuild(entity)
            console.log(build)
            break
        default:
            console.log("Default -> in switch")
            break
    }
}


module.exports = {
    parseEntityFromJson
}