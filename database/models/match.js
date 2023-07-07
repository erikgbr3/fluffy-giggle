'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     // models.Match.belongsTo(models.Club,
       // {
         // as: 'club',
          //foreignKey: 'homeTeamId',
        //}  
      //);
      models.Match.belongsTo(models.Club,
        {
          as: 'clubs',
          foreignKey: 'visitorTeamId',
        }  
      );
      models.Match.belongsTo(models.League,
        {
          as: 'league',
          foreignKey: 'leagueId',
        }  
      );
      models.Match.hasMany(models.GoalScore,
        {
          as: 'goalscore',
          foreignKey: 'matchId',
        }  
      );
      models.Match.hasMany(models.FoulCard,
        {
          as: 'foulcard',
          foreignKey: 'matchId',
        }  
      );
    }
  }
  Match.init({
    homeTeamId: DataTypes.INTEGER,
    scoreHome: DataTypes.INTEGER,
    visitorTeamId: DataTypes.INTEGER,
    scoreVisitor: DataTypes.INTEGER,
    date: DataTypes.STRING,
    hour: DataTypes.STRING,
    leagueId: DataTypes.INTEGER,
    refereeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};