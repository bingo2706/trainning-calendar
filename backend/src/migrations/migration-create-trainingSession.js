"use strict";

const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("TrainingSessions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            session_date: {
                type: Sequelize.DATE,
            },
            workout_name: {
                type: Sequelize.STRING,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("TrainingSessions");
    },
};
