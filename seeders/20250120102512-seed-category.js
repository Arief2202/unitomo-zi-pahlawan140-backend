'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
          {
            categoryName: 'Pendidikan',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            categoryName: 'Pemerintahan',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            categoryName: 'Artikel',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            categoryName: 'Berita',
            createdAt: new Date(),
            updatedAt: new Date()
          },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
