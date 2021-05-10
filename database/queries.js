const db = require('./config.js')

const createPodInstance = (pod) => {
  return {
    uid: pod.pod_uid,
    name: pod.name,
    url: pod.url,
    clusterName: pod.cluster_name,
    statusMessage: pod.status_message,
    creationDate: pod.creation_timestamp,
    replicasetCount: pod.replicaset_count,
    specification: pod.specification,
    builds: [createBuildInstance(pod)],
    containers: [createContainerInstance(pod)],
  }
}

const createBuildInstance = ({ build_uid, build_source, build_order }) => {
  return {
    uid: build_uid,
    buildSource: build_source,
    buildOrder: build_order
  }
}

const createContainerInstance = ({ container_uid, port, port_uid, protocol_name }) => {
  return {
    uid: container_uid,
    ports: [{
      uid: port_uid,
      port,
      protocol: protocol_name
    }]
  }
}

const createPortInstance = ({ port_uid, port, protocol_name }) => {
  return {
    uid: port_uid,
    port,
    protocol: protocol_name
  }
}

const hydratePods = (pods) => {
  let results = []
  pods.forEach(pod => {
    const podIndex = results.findIndex(element => element.uid === pod.pod_uid)
    if (podIndex === -1) {// we didn't found pod, so add it to array
      results.push(createPodInstance(pod))
    } else { // we found pod so update inner properties
      const buildIndex = results[podIndex].builds.findIndex(element => element.uid === pod.build_uid)
      if (buildIndex === -1) {
        results[podIndex].builds.push(createBuildInstance(pod))
      }
      const containerIndex = results[podIndex].containers.findIndex(element => element.uid === pod.container_uid)
      if (containerIndex === -1) {
        results[podIndex].containers.push(createContainerInstance(pod))
      } else {
        const portIndex = results[podIndex].containers[containerIndex].ports.findIndex(element => element.uid === pod.port_uid)
        if (portIndex === -1) results[podIndex].containers[containerIndex].ports.push(createPortInstance(pod))
      }
    }
  })
  return results
}

const getAllPods = async () => {
  try {
    const pods = await db("pods")
      .select([
        "pods.uid AS pod_uid",
        "pods.*",
        "builds.uid AS build_uid",
        "builds.*",
        "ports.uid AS port_uid",
        "ports.*",
        "containers.uid AS container_uid",
        "containers.*"
      ])
      .join("builds", "builds.pod_name", "pods.name")
      .join("containers", "containers.pod_uid", "pods.uid")
      .join("ports", "ports.container_uid", "containers.uid")
    return hydratePods(pods)
  } catch (e) {
    console.error(e)
  }
}

const updatePodSpecification = async (identificator, specification) => {
  try {
    await db("pods")
      .where(identificator)
      .update(specification)
  } catch (e) {
    console.error(e)
  }
}

const getSpecificPod = async (identificator) => {
  try {
    return await db("pods")
      .select("*")
      .where(identificator)

  } catch (e) {
    console.error(e)
  }
}

const updateEntity = async (collection, table, updateScope) => {
  collection = Array.isArray(collection) ? collection : [collection]
  try {
    const trx = await db.transaction()
    const queries = collection.map(tuple => {
      const updateObject = { [updateScope]: tuple[updateScope] }
      return db(table)
        .where(updateObject)
        .update(tuple)
        .transacting(trx)
    })
    return Promise.all(queries)
      .then(trx.commit)
      .catch(trx.rollback)
  } catch (e) {
    console.error(e)
  }
}

const insertEntity = async (entity, table) => {
  try {
    return await db(table).insert(entity)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  getAllPods,
  insertEntity,
  updateEntity,
  getSpecificPod,
  updatePodSpecification,
}