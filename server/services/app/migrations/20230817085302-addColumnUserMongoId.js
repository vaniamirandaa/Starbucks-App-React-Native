'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Items', 'UserMongoId', { type: Sequelize.DataTypes.STRING });
    /**
     * Add altering commands here.
     *
     * Example:
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Items', 'UserMongoId');
    /**
     * Add reverting commands here.
     *
     * Example:
     */
  }
};
