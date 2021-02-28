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
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: 5432
        },
        migrations: {
            directory: './database/migrations'
        }
    }

};