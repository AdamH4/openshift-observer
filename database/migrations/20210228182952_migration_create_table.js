
exports.up = function (knex) {
  return knex.schema.createTable("pods", table => {
    table.text("uid").primary()
    table.text("name").notNullable().unique()
    table.text("url")
    table.text("cluster_name")
    table.text("status_message")
    table.timestamp("creation_timestamp")
    table.integer("replicaset_count")
    table.json("specification")
  })
    .createTable("builds", table => {
      table.text("uid").primary()
      table.text("pod_name").references("name").inTable("pods")
      table.text("build_source")
      table.integer("build_order")
    })
    .createTable("containers", table => {
      table.text("uid").primary()
      table.text("pod_uid").references("uid").inTable("pods")
      table.text("name")
    })
    .createTable("ports", table => {
      table.text("container_uid").references("uid").inTable("containers")
      table.integer("port")
      table.text("protocol_name")
      table.primary(["port", "container_uid"])
    })
}

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("ports"),
    knex.schema.dropTableIfExists("build"),
    knex.schema.dropTableIfExists("containers"),
    knex.schema.dropTableIfExists("ports"),
  ])
}
