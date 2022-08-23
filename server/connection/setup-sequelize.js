require("dotenv").config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const USER = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const DB_TYPE = process.env.DB_TYPE;

const host_postgres = `${DB_TYPE}://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`
const config_postgres = {
    logging: false,
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true,
        timezone: "+07:00",
    },
    timezone: "+07:00",
    operatorsAliases: 0,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
}

module.exports = {
    host_postgres,
    config_postgres
}