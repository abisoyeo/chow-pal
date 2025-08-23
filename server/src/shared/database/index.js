const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");
const loadModels = require("./modelLoader");
const config = require("../config/db");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  dialectOptions: dbConfig.dialectOptions,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = loadModels(sequelize, DataTypes);

module.exports = db;
