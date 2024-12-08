const connection = require("./models/db");
require("./models/base");

connection.sync({alter: true}).then(() => console.log("Database synchronized"));
