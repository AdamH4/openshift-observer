
exports.up = function (knex) {
    return knex.schema.createTable("pods", table => {
        table.text("uid").primary()
        table.text("name")
        table.text("full_name")
        table.text("url")
        table.text("cluster_name")
        table.text("status_message")
        table.text("build_source")
        table.timestamp("creation_timestamp")
        table.integer("replicaset_count")
        table.json("specification")
    })
        .createTable("builds", table => {
            table.text("uid").primary()
            table.text("full_name")
            table.text("pod_name")
            table.text("pod_uid").references("uid").inTable("pods")
            table.text("build_source")
            table.integer("build_order")
        })
        .createTable("containers", table => {
            table.text("uid").primary()
            table.text("pod_uid").references("uid").inTable("pods").onDelete("CASCADE")
            table.text("name")
        })
        .createTable("ports", table => {
            table.text("uid").primary()
            table.text("container_uid").references("uid").inTable("containers").onDelete("CASCADE")
            table.integer("port")
            table.text("protocol_name")
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
