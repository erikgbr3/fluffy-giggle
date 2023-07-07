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
      models.League.belongsTo(models.User, 
        {
        as: 'user',
        foreignKey: 'ownerId', 
      });
      models.League.hasMany(models.Suscription,
        {
          as: 'suscription',
          foreignKey: 'leagueId',
        }  
      );
      models.League.hasMany(models.Match,
        {
          as: 'match',
          foreignKey: 'leagueId', 
        }  
      );
      models.League.hasOne(models.PositionTableLeague,
        {
          as: 'position',
          foreignKey: 'leagueId',
        }  
      );
    }
  }
  League.init({
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    prize: DataTypes.STRING,
    init: DataTypes.STRING,
    description: DataTypes.TEXT,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'League',
  });
  return League;
};