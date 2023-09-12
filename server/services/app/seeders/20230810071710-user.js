'use strict';
const bcrypt = require('bcryptjs'); // Import bcryptjs library
const data = require('../db/user.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedData = data.map((e) => {
      const hash = bcrypt.hashSync(e.password, 10); // Hash the password using bcrypt
      return {
        ...e,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Users', hashedData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
