const knex = require('knex');
const knexfile = require('../knexfile');

// const env = process.env.NODE_ENV || 'development';

const configOptions = knexfile['development'];

module.exports = knex(configOptions);