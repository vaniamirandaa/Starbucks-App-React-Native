'use strict';
const data = require('../db/items.json')

  data.forEach((e) => {
    delete e.id;
    e.createdAt = new Date();
    e.updatedAt = new Date();
  });
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
