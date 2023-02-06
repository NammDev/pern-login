const Pool = require('pg').Pool

const pool = new Pool({
  users: 'postgres',
  password: 'namkhanh',
  host: 'localhost',
  port: 5432,
  database: 'authtodo',
})

module.exports = pool
