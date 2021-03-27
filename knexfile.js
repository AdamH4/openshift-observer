require('dotenv').config()

module.exports = {

    development: {
        client: 'pg',
        // connection: process.env.DATABASE_URL,
        connection: {
            host: process.env.DEV_DB_HOST,
            user: process.env.DEV_DB_USER,
            database: process.env.DEV_DB_NAME,
            password: process.env.DEV_DB_PASSWORD,
            port: 5432
        },
        migrations: {
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeds'
        }
    },

    openshift: {
        client: 'pg',
        connection: {
            host: process.env.POSTGRESQL_SERVICE_HOST || process.env.HOST,
            user: "adam",
            database: "observer",
            password: "acerx233h",
            port: 5432
        },
        migrations: {
            directory: './database/migrations'
        }
    }
}