'use strict';
const {
  Model
} = require('sequelize');
const Category = require('./Category');
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      news.belongsTo(models.category, {
        foreignKey: 'categoryId',
        as: 'categories'
      });
    }
  }
  news.init({
    categoryId: DataTypes.INTEGER,
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    imageDesc: DataTypes.STRING,
    imageSource: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, 
  {
    sequelize,
    modelName: 'news',
  });
  return news;
};