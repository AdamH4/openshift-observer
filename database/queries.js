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
const updateEntity = async (entity, databaseName, updateScope) => {
  try {
    return await db(databaseName).update(entity).where(updateScope)
  } catch (e) {
    console.error(e)
  }
}
const insertEntity = async (entity, databaseName) => {
  try {
    return await db(databaseName).insert(entity)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  getAllPods,
  insertEntity
}