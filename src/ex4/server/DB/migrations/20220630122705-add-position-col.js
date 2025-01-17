'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Items', 'position', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Items', 'position');

  }
};
