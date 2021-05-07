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
    return db.transaction(trx => {
      const queries = entity.map(tuple =>
        (table)
          .where('id', tuple.id)
          .update(tuple)
          .transacting(trx)
      );
      return Promise.all(queries)
        .then(trx.commit)
        .catch(trx.rollback);
    });
    const transaction = await db.transaction()
    if (Array.isArray(entity)) {
      entity.forEach(item => {
        transaction(databaseName)
          .update(item)
          .where(updateScope)
      })
    }
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