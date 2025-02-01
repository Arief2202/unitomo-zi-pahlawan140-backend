'use strict';

const { tr } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('news', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageDesc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imageSource: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      totalViews: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addConstraint('news',  {
      type: 'FOREIGN KEY',
      name: 'FK_categories_news', 
      fields: ['categoryId'],
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('news');
  }
};