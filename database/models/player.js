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
      models.Player.belongsTo(models.Club,
        {
          as: 'club',
          foreignKey: 'clubId',
        }   
      );
      models.Player.hasMany(models.GoalScore,
        {
          as: 'goalscore',
          foreignKey: 'playerId',
        }  
      );
      models.FoulCard.hasMany(models.FoulCard,
        {
          as: 'foulcard',
          foreignKey: 'playerId',
        }  
      );
    }
  }
  Player.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    age: DataTypes.STRING,
    numberjersey: DataTypes.STRING,
    position: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    curp: DataTypes.STRING,
    clubId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};