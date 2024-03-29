"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TrainingSession extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            TrainingSession.hasMany(models.Excercise, {
                foreignKey: "session_id",
                as: "excercises",
            });
        }
    }
    TrainingSession.init(
        {
            session_date: DataTypes.DATE,
            workout_name: DataTypes.STRING,
            position: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "TrainingSession",
        }
    );
    return TrainingSession;
};
