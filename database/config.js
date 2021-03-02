const knex = require('knex');
const knexfile = require('../knexfile');

// const env = process.env.NODE_ENV || 'development';

const configOptions = knexfile['openshift'];

module.exports = knex(configOptions);