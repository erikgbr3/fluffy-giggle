'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PositionTableLeagues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matchesWon: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      tiedMatches: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lostGames: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      gamesPlayed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      gf: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      gc: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      df: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      clubId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clubs',
          key: 'id'
        }
      },
      leagueId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Leagues',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PositionTableLeagues');
  }
};