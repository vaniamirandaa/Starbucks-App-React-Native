'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Item, { foreignKey: 'authorId' });

    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This email already exists!'
      },      
      validate: {
        notEmpty :{
          msg: 'Email can not be empty!'
        },
        isEmail: {
          msg: 'Invalid email address!'
        },
      },
      notNull: {
        msg: 'Email is required!'
      }
    },    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password can not be empty!'
        },
      },
      notNull: {
        msg: 'Password is required!'
      }
    },    
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user)=>{
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  })
  User.afterCreate((user)=>{
    delete user.dataValues.password
  })
  return User;
};