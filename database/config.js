const knex = require('knex');
const knexfile = require('../knexfile');

// const env = process.env.NODE_ENV || 'development';

console.log(knexfile['openshift'])
console.log(process.env)
const configOptions = knexfile['openshift'];

module.exports = knex(configOptions);