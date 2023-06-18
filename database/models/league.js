'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class League extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  League.init({
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    prize: DataTypes.STRING,
    init: DataTypes.DATE,
    description: DataTypes.TEXT,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'League',
  });
  return League;
};