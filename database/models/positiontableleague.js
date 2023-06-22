'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PositionTableLeague extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.PositionTableLeague.belongsTo(models.League,
        {
          as: 'league',
          foreignKey: 'leagueId',
        }  
      );
      models.PositionTableLeague.belongsTo(models.Club,
        {
          as: 'club',
          foreignKey: 'clubId',
        }  
      );
    }
  }
  PositionTableLeague.init({
    matchesWon: DataTypes.INTEGER,
    tiedMatches: DataTypes.INTEGER,
    lostGames: DataTypes.INTEGER,
    gamesPlayed: DataTypes.INTEGER,
    gf: DataTypes.INTEGER,
    gc: DataTypes.INTEGER,
    df: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    clubId: DataTypes.INTEGER,
    leagueId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PositionTableLeague',
  });
  return PositionTableLeague;
};