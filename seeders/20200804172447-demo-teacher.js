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

   await queryInterface.bulkInsert('Teachers', [{
    email: 'teacher1@email.com',
    createdAt: Sequelize.literal('NOW()'), 
    updatedAt: Sequelize.literal('NOW()')
    }, {
      email: 'teacher2@email.com',
      createdAt: Sequelize.literal('NOW()'), 
      updatedAt: Sequelize.literal('NOW()')
    },{
    email: 'teacher3@email.com',
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

    await queryInterface.bulkDelete('Teacher', null, {});
  }
};
