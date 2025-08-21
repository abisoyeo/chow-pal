/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import("sequelize").DataTypes} DataTypes
 * @returns {import("sequelize").ModelCtor<import("sequelize").Model<any, any>>}
 */

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      deviceId: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      tableName: "orders",
      underscored: true,
      timestamps: true,
    }
  );

  Order.associate = (db) => {
    Order.belongsToMany(db.Menu, {
      through: db.OrderItem,
      foreignKey: "orderId",
      otherKey: "menuId",
    });
  };

  return Order;
};
