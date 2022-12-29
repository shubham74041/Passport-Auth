const { Client } = require("pg");
const client = new Client({
    user: "com118",
    host: "localhost",
    database: "dbsignup",
    password: "1234",
    port: 5432
});