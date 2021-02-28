
exports.up = function (knex) {
  return knex.schema.createTable("pods", table => {
    table.increments("id").primary()
    table.text("name").notNullable().unique()
    table.json("oas")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pods")
}
