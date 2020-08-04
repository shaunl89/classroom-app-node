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
      studentId: 1
    }, {
      teacherId: 1,
      studentId: 2
    },{
      teacherId: 2,
      studentId: 3
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
