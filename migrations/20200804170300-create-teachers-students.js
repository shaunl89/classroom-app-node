'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TeachersStudents', {
      teacherId: {
        type: Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TeachersStudents');
  }
};