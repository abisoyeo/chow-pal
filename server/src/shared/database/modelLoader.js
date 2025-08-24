const fs = require("fs");
const path = require("path");

/**
 * Auto-loads Sequelize models from feature folders
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import("sequelize").DataTypes} DataTypes
 * @returns {Record<string, import("sequelize").Model>}
 */
function loadModels(sequelize, DataTypes) {
  const db = { sequelize };
  const featuresPath = path.join(__dirname, "../../features");

  fs.readdirSync(featuresPath, { withFileTypes: true }).forEach(
    (featureDir) => {
      if (featureDir.isDirectory()) {
        const modelFiles = fs
          .readdirSync(path.join(featuresPath, featureDir.name))
          .filter((file) => file.endsWith(".model.js"));

        modelFiles.forEach((file) => {
          const model = require(path.join(featuresPath, featureDir.name, file))(
            sequelize,
            DataTypes
          );
          db[model.name] = model;
        });
      }
    }
  );

  Object.keys(db).forEach((modelName) => {
    if (db[modelName]?.associate) {
      db[modelName].associate(db);
    }
  });

  return db;
}

module.exports = loadModels;
