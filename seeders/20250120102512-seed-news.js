'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { id_ID, fakerID_ID } = require('@faker-js/faker');

    for(var a=0; a<100; a++){
      await queryInterface.bulkInsert('news', [
            {
              categoryId: Math.floor(Math.random() * 4)+1,
              author: fakerID_ID.person.fullName(),
              title: fakerID_ID.word.words(5),
              image: fakerID_ID.image.urlPicsumPhotos({width: 1024, height: 768, category: 'nature', blur: 0, grayscale: false}),
              imageDesc: fakerID_ID.word.words(5),
              imageSource: fakerID_ID.word.words(5),
              content: fakerID_ID.word.words(Math.floor(Math.random() * 100)+100),
              totalViews: Math.floor(Math.random() * 5000),
              createdAt: new Date(),
              updatedAt: new Date()
            }
      ], {});
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('news', null, {});
  }
};
