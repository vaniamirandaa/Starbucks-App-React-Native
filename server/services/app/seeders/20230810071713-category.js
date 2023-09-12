'use strict';
const data = require('../db/category.json')

  data.forEach((e) => {
    delete e.id;
    e.createdAt = new Date();
    e.updatedAt = new Date();
  });
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', data, {})
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
    await queryInterface.bulkDelete('Categories', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
