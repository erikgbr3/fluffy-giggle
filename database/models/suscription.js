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
      models.Suscripton.belongsTo(models.League,
        {
          as: 'league',
          foreignKey: 'leagueId',
        }  
      );
      models.Suscripton.belongsTo(models.Club,
        {
          as: 'club',
          foreignKey: 'leagueId',
        }  
      );
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