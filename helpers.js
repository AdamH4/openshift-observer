// find pod with same name and return it's index
const findPodIndexByBuildName = (pods, buildName) => {
    const lookingPodName = buildName.slice(0, buildName.lastIndexOf("-"))
    let podIndex = undefined
    pods.forEach((pod, index) => {
        if (pod.name === lookingPodName) podIndex = index
    })
    return podIndex
}

// get build repo URL and return it
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

//get builds from response and update pods
const parseBuildAndUpdatePods = (items, pods) => {
    items.forEach(item => {
        if (item.metadata.ownerReferences[0].kind === "Build") {
            const podIndex = findPodIndexByBuildName(pods, item.metadata.labels["openshift.io/build.name"])
            if (typeof podIndex !== undefined) {
                pods[podIndex].buildsCount++
                pods[podIndex].repoLink = pods[podIndex].repoLink ? pods[podIndex].repoLink : findBuildRepoURL(item)
            }
        }
    })
    return pods
}

// loop pod array and return index of pod with podName
// or return undefined
const checkIfPodIsListed = (pods, podName) => {
    let i = 0
    for (let pod in pods) {
        if (pod.name === podName) return i
        i++
    }
    return undefined
}

//get just pods from response
const parsePods = (items) => {
    let pods = []
    items.forEach(item => {
        if (item.metadata.ownerReferences[0].kind === "ReplicaSet") {
            const podIndex = checkIfPodIsListed(pods, item.metadata.labels.app)
            if (podIndex === undefined) {
                pods.push({
                    name: item.metadata.labels.app,
                    cluster: item.metadata.namespace,
                    creationTimestamp: item.metadata.creationTimestamp,
                    status: item.status.phase,
                    podLink: `http://${item.metadata.labels.app}-${item.metadata.namespace}.apps-crc.testing`,
                    containers: item.spec.containers.map(container => {
                        return {
                            containerName: container.name,
                            ports: container.ports
                        }
                    }),
                    replicaSetCount: 0,
                    repoLink: 0,
                    buildsCount: null,
                })
            } else {
                pods[podIndex].replicaSetCount++
            }
        }
    })
    return pods
}

//parse data from api and retrieve them
const parsePodsFromApi = (response) => {
    let pods = parsePods(response.items)
    return parseBuildAndUpdatePods(response.items, pods)
}


module.exports = {
    parsePodsFromApi
}