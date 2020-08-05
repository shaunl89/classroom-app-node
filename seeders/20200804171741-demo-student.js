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
   await queryInterface.bulkInsert('Students', [{
       email: 'student1@email.com',
       suspended: false,
       createdAt: Sequelize.literal('NOW()'), 
       updatedAt: Sequelize.literal('NOW()')
     }, {
       email: 'student2@email.com',
       suspended: false,
       createdAt: Sequelize.literal('NOW()'), 
       updatedAt: Sequelize.literal('NOW()')
     }, {
      email: 'student3@email.com',
      suspended: false,
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
    await queryInterface.bulkDelete('Student', null, {})
  }
};
