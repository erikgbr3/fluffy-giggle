'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoalScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.GoalScore.belongsTo(models.Player,
        {
          as: 'player',
          foreignKey: 'playerId',
        }  
      );
      models.GoalScore.belongsTo(models.Match,
        {
          as: 'match',
          foreignKey: 'matchId', 
        }  
      );
    } 
  }
  GoalScore.init({
    playerId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GoalScore',
  });
  return GoalScore;
};