'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { id_ID, fakerID_ID } = require('@faker-js/faker');

    for(var a=0; a<10; a++){
      await queryInterface.bulkInsert('carousels', [
            {
              image: fakerID_ID.image.urlPicsumPhotos({width: 1024, height: 768, category: 'nature', blur: 0, grayscale: false}),
              createdAt: new Date(),
              updatedAt: new Date()
            }
      ], {});
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('carousels', null, {});
  }
};
