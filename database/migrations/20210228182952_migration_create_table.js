
exports.up = function (knex) {
  return knex.schema.createTable("pods", table => {
    table.text("uid").primary()
    table.text("name").notNullable().unique()
    table.text("url")
    table.text("cluster_name")
    table.text("status_message")
    table.timestamp("creation_timestamp")
    table.text("repository_link")
    table.integer("replicaset_count")
    table.json("oas")
  })
    .createTable("builds", table => {
      table.text("uid").primary()
      table.text("pod_name").references("name").inTable("pods")
      table.text("build_source")
      table.integer("build_order")
    })
    .createTable("containers", table => {
      table.increments("id").primary()
      table.text("pod_uid").references("name").inTable("pods")
      table.text("build_source")
      table.integer("build_order")
    })
    .createTable("ports", table => {
      table.increments("id").primary()
      table.integer("container_id").references("id").inTable("containers")
      table.integer("port")
      table.text("protocol_name")
    })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pods")
    .dropTableIfExists("builds")
    .dropTableIfExists("containers")
    .dropTableIfExists("ports")
}
