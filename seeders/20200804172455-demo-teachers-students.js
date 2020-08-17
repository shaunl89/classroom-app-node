'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('TeachersStudents', [{
      teacherId: 1,
      studentId: 1,
      createdAt: Sequelize.literal('NOW()'), 
      updatedAt: Sequelize.literal('NOW()')
    }, {
      teacherId: 1,
      studentId: 2,
      createdAt: Sequelize.literal('NOW()'), 
      updatedAt: Sequelize.literal('NOW()')
    }, {
      teacherId: 2,
      studentId: 3,
      createdAt: Sequelize.literal('NOW()'), 
      updatedAt: Sequelize.literal('NOW()')
    }, {
      teacherId: 1,
      studentId: 3,
      createdAt: Sequelize.literal('NOW()'), 
      updatedAt: Sequelize.literal('NOW()')
    }, {
      teacherId: 2,
      studentId: 2,
      createdAt: Sequelize.literal('NOW()'), 
      updatedAt: Sequelize.literal('NOW()')
    }], {})
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TeachersStudents', null, {});
  }
};
