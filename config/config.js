const Sequelize = require("sequelize");

require("dotenv").config();

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME
} = process.env;

module.exports = {
  production: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: "mysql",
    dialectOptions: { dateStrings: true, typeCast: true },
    timezone: "+09:00",
    logging: false,
    operatorsAliases: Sequelize.Op,
    pool: {
      max: 10,
      min: 5,
      idle: 10000,
      acquire: 60000
    }
  }
};
