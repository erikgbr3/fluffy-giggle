'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

import club from './club';
import foulcard from './foulcard';
import goalscore from './goalscore';
import league from './league';
import match from './match';
import player from './player';
import positiontableleague from './positiontableleague';
import role from './role';
import sportfield from './sportfield';
import suscription from './suscription';
import user from './user';

db.Club = club(sequelize, Sequelize.DataTypes);
db.FoulCard = foulcard(sequelize, Sequelize.DataTypes);
db.GoalScore = goalscore(sequelize, Sequelize.DataTypes);
db.League = league(sequelize, Sequelize.DataTypes);
db.Match = match(sequelize, Sequelize.DataTypes);
db.Player = player(sequelize, Sequelize.DataTypes);
db.PositionTableLeague = positiontableleague(sequelize, Sequelize.DataTypes);
db.Role = role(sequelize, Sequelize.DataTypes);
db.SportField = sportfield(sequelize, Sequelize.DataTypes);
db.Suscription = suscription(sequelize, Sequelize.DataTypes);
db.User = user(sequelize, Sequelize.DataTypes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
