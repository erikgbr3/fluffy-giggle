'use strict';
import bcrypt from "bcrypt"
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsTo(models.Role,
        {
          as: 'role',
          foreignKey: 'stateId',
        }  
      );
      models.User.hasMany(models.League,
        {
          as: 'leagues',
          foreignKey: 'ownwerId',
        }  
      );
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: {
          args: /^[a-zA-ZáéíóúñÁÉÍÓÚ\s]+$/,
          msg: "El Nombre no debe contener Números"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:{
          msg: 'El email es obligatorio',
        },
        isEmail: {
          msg: 'Debe ingresar un email válido'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La contraseña es obligatoria',
        },
        len: {
          args: [8, 255],
          msg: 'La contraseña debe contener minimo 8 caracteres'
        }
      },
      passwordResetToken: DataTypes.STRING(128),
      passwordResetExpire: DataTypes.BIGINT
    },
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  return User;
};