
exports.up = function (knex) {
  return knex.schema.createTable("pods", table => {
    table.increments("id").primary()
    table.text("name").notNullable().unique()
    table.text("url")
    table.text("cluster_name")
    table.text("status_message")
    table.text("repository_link")
    table.text("replicaset_count")
    table.text("build_count")
    table.json("oas")
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pods")
}
