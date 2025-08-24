"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("orders", "paystack_url", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("orders", "email", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("orders", "paystackUrl");
    await queryInterface.removeColumn("orders", "email");
  },
};
