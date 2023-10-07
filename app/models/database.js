// import required node-modules and custom configurations
const MYSQL = require("mysql");
const DATABASE_CONFIGURATION = require("../configuration/database.configuration.js");

// connecting to database, using configuration
const CONNECTION = MYSQL.createConnection(
    {
        host : DATABASE_CONFIGURATION.HOST,
        user : DATABASE_CONFIGURATION.USER,
        password : DATABASE_CONFIGURATION.PASSWORD,
        database : DATABASE_CONFIGURATION.DATABASE
    }
);

// open connection
CONNECTION.connect(error => {
    if (error) throw error;
    console.log("Connection to database was successfully established.");
});

module.exports = CONNECTION;