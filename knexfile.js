require('dotenv').config()

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: process.env.DEV_DB_HOST,
            user: process.env.DEV_DB_USER,
            database: process.env.DEV_DB_NAME,
            password: process.env.DEV_DB_PASSWORD,
            port: 5432
        },
        migrations: {
            directory: './database/migrations'
        }
    },

    openshift: {
        client: 'pg',
        connection: {
            host: process.env.POSTGRESQL_SERVICE_HOST || process.env.HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: 5432
        },
        migrations: {
            directory: './database/migrations'
        },
        afterCreate: function (conn, done) {
            // in this example we use pg driver's connection API
            conn.query('SET timezone="UTC";', function (err) {
                if (err) {
                    // first query failed, return error and don't try to make next query
                    done(err, conn)
                } else {
                    // do the second query...
                    conn.query('SELECT set_limit(0.01);', function (err) {
                        // if err is not falsy, connection is discarded from pool
                        // if connection aquire was triggered by a query the error is passed to query promise
                        done(err, conn)
                    })
                }
            })
        }
    }
}