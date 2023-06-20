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
    }
  }
  Match.init({
    homeTeamId: DataTypes.INTEGER,
    scoreHome: DataTypes.INTEGER,
    visitorTeamId: DataTypes.INTEGER,
    scoreVisitor: DataTypes.INTEGER,
    date: DataTypes.DATE,
    hour: DataTypes.TIME,
    leagueId: DataTypes.INTEGER,
    refereeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};