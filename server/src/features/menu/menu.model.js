/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import("sequelize").DataTypes} DataTypes
 * @returns {import("sequelize").ModelCtor<import("sequelize").Model<any, any>>}
 */

module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "menus",
      underscored: true,
      timestamps: true,
    }
  );

  Menu.associate = (db) => {
    Menu.belongsToMany(db.Order, {
      through: db.OrderItem,
      foreignKey: "menuId",
      otherKey: "orderId",
    });
  };

  return Menu;
};
