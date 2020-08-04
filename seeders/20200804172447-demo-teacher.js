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
    email: 'teachertan@email.com'
  }, {
    email: 'teacherkoh@email.com'
  },{
   email: 'teacherbernard@email.com'
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
