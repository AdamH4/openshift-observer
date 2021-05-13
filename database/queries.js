const db = require('./config.js')

// check if object is empty
const isObjectEmpty = (obj) => {
  return Object.values(obj).every(propValue => {
    if (propValue === null) return true
    if (Array.isArray(propValue) && propValue.length === 0) return true
    if (typeof propValue === 'object') return isObjectEmpty(propValue)
  })
}

const createPodInstance = (pod) => {
  const buildInstance = createBuildInstance(pod)
  const containerInstance = createContainerInstance(pod)
  return {
    uid: pod.pod_uid,
    name: pod.name,
    url: pod.url,
    clusterName: pod.cluster_name,
    statusMessage: pod.status_message,
    creationDate: pod.creation_timestamp,
    replicasetCount: pod.replicaset_count,
    specification: pod.specification,
    builds: isObjectEmpty(buildInstance) ? [] : [buildInstance],
    containers: isObjectEmpty(containerInstance) ? [] : [containerInstance],
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
  const portInstance = createPortInstance({ port, port_uid, protocol_name })
  return {
    uid: container_uid,
    ports: isObjectEmpty(portInstance) ? [] : [portInstance]
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
      const buildIndex = results[podIndex].builds.findIndex(element => element.uid === pod.build_pod_uid)
      if (buildIndex === -1) {
        results[podIndex].builds.push(createBuildInstance(pod))
      }
      const containerIndex = results[podIndex].containers.findIndex(element => element.uid === pod.container_pod_uid)
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
        "builds.pod_uid AS build_pod_id",
        "builds.*",
        "ports.uid AS port_uid",
        "ports.container_uid AS port_container_uid",
        "ports.port",
        "ports.protocol_name",
        "containers.uid AS container_uid",
        "containers.name AS container_name",
        "containers.pod_uid AS container_pod_uid",
      ])
      .leftJoin("builds", "builds.pod_uid", "pods.uid")
      .leftJoin("containers", "containers.pod_uid", "pods.uid")
      .leftJoin("ports", "ports.container_uid", "containers.uid")
    return hydratePods(pods)
  } catch (e) {
    console.error(e)
  }
}

const updatePodColumn = async (identificator, specification) => {
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
    const pod = await db("pods")
      .select("*")
      .where(identificator)
    return pod
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
const deleteEntity = async (deleteBy, table) => {
  try {
    return await db(table)
      .where(deleteBy)
      .del()
  } catch (e) {
    console.error(e)
  }

}

const insertEntity = async (entity, table, conflictingCols = ["uid"]) => {
  try {
    return await db(table)
      .insert(entity)
      .onConflict(conflictingCols)
      .ignore()
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  getAllPods,
  insertEntity,
  updateEntity,
  getSpecificPod,
  updatePodColumn,
  deleteEntity,
}