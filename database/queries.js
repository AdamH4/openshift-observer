const db = require('./config.js')

const getAllPods = async () => {
  try {
    return await db("pods")
      .select("*")
      .join("builds", "builds.pod_name", "pods.name")
    // TODO teraz treba hydratovat data
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