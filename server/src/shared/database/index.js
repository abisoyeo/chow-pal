const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const loadModels = require("./modelLoader");

const db = loadModels(sequelize, DataTypes);

module.exports = db;
