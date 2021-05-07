const { update } = require('./config.js')
const db = require('./config.js')

const getAllPods = async () => {
  let pods = []
  try {
    pods = await db("pods").select()
  } catch (e) {
    console.error(e)
  }
  return pods
}

// const insertEntity = async (entity, databaseName, conflictColumn, returnCol) => {
//   const parsedEntityForExcluding = entity.length ? entity[0] : entity
//   const excludedQuery = Object.keys(parsedEntityForExcluding).map(key => `${key} = EXCLUDED.${key}`)
//   const returnColumn = returnCol ? returnCol : Object.keys(parsedEntityForExcluding)[0]
//   const conflict = conflictColumn.length ? conflictColumn.join(", ") : conflictColumn
//   try {
//     const query = `${db(databaseName).insert(entity).toQuery()} ON CONFLICT(${conflict}) DO UPDATE SET ${excludedQuery.join(", ")} returning ${returnColumn}`
//     return await db.raw(query)
//   } catch (e) {
//     console.error(e)
//   }
// }
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
  updateEntity
}