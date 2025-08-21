/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import("sequelize").DataTypes} DataTypes
 * @returns {import("sequelize").ModelCtor<import("sequelize").Model<any, any>>}
 */

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      menuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "order_items",
      underscored: true,
      timestamps: true,
    }
  );

  OrderItem.associate = (db) => {
    OrderItem.belongsTo(db.Order, { foreignKey: "orderId" });
    OrderItem.belongsTo(db.Menu, { foreignKey: "menuId" });
  };

  return OrderItem;
};
