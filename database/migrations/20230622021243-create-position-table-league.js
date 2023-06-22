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
        type: Sequelize.INTEGER
      },
      tiedMatches: {
        type: Sequelize.INTEGER
      },
      lostGames: {
        type: Sequelize.INTEGER
      },
      gamesPlayed: {
        type: Sequelize.INTEGER
      },
      gf: {
        type: Sequelize.INTEGER
      },
      gc: {
        type: Sequelize.INTEGER
      },
      df: {
        type: Sequelize.INTEGER
      },
      points: {
        type: Sequelize.INTEGER
      },
      clubId: {
        type: Sequelize.INTEGER
      },
      leagueId: {
        type: Sequelize.INTEGER
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