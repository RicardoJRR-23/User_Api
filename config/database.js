const { Pool } = require('pg');

const connectDB = new Pool({
    user: 'postgres',
    password: '12345678',
    host: 'localhost',
    port: '5432',
    database: 'user_db'
});

module.exports = connectDB;