"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("menus", [
      {
        name: "Jollof Rice",
        price: 1200.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pounded Yam & Egusi Soup",
        price: 2000.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Suya",
        price: 800.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pepper Soup",
        price: 1000.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Moi Moi",
        price: 700.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("menus", null, {});
  },
};
