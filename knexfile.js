require('dotenv').config()

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: DB_PASSWORD,
            port: 5432
        },
        migrations: {
            directory: './db/migrations'
        }
    },

    production: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: DB_PASSWORD,
            port: 5432
        },
        migrations: {
            directory: './db/migrations'
        }
    }

};