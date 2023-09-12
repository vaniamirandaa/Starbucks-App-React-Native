'use strict';
const {
  Model
} = require('sequelize');
const { default: slugify } = require('slugify');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.hasMany(models.Ingredient, { foreignKey: 'itemId' });
      // Item.belongsTo(models.User, { foreignKey: 'authorId' });
      Item.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    UserMongoId: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    slug: {
      type: DataTypes.STRING,
      // allowNull: false,
      // unique: true
    }
  }, 
  {
    sequelize,
    modelName: 'Item',
  });

  Item.beforeCreate((item) => {
    item.slug = slugify(item.name, { lower: true });
  })

  Item.beforeUpdate((item) => {
    item.slug = slugify(item.name, { lower: true });
  })


  return Item;
};