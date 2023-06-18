'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suscription.init({
    leagueId: DataTypes.INTEGER,
    clubId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Suscription',
  });
  return Suscription;
};