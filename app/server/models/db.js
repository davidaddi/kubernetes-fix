const { Sequelize } = require("sequelize");

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const defaultURL = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connection = new Sequelize(process.env.DATABASE_URL ?? defaultURL);

connection.authenticate().then(() => console.log("Database is ready"));

module.exports = connection;
