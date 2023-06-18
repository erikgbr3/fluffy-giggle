'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Player.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    age: DataTypes.STRING,
    numberjersey: DataTypes.STRING,
    position: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    curp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};