const { Sequelize } = require("sequelize");

const DB_HOST = process.env.DB_HOST || 'mysql';
const DB_PORT = process.env.DB_PORT || '3306';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'projetkub';

const defaultURL = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connection = new Sequelize(process.env.DATABASE_URL ?? defaultURL, {
  logging: console.log,
  dialectOptions: {
    connectTimeout: 10000
  }
});

connection.authenticate()
  .then(() => console.log("Database is ready"))
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

module.exports = connection;