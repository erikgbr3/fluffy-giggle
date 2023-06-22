'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoulCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.FoulCard.belongsTo(models.Player,
        {
          as: 'player',
          foreignKey: 'playerId',
        }  
      );
      models.FoulCard.belongsTo(models.Match,
        {
          as: 'match',
          foreignKey: 'matchId',
        }  
      );
    }
  }
  FoulCard.init({
    playerId: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FoulCard',
  });
  return FoulCard;
};