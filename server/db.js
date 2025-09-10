const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load env from server/config.env
dotenv.config({ path: path.join(__dirname, 'config.env') });

// Enforce MySQL as the only supported database for this project
// Required env vars (with sensible defaults for local dev)
const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_NAME = 'catering_db',
  DB_USER = 'root',
  DB_PASSWORD = '',
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    // keep connection stable on some environments
    multipleStatements: false,
  },
  define: {
    // consistent naming
    underscored: false,
    freezeTableName: false,
  },
});

module.exports = { sequelize };


