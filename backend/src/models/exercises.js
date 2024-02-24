"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Exercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    Exercise.init(
        {
            session_id: DataTypes.INTEGER,
            exercise_name: DataTypes.STRING,
            set_info: DataTypes.STRING,
            set_number: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Exercise",
        }
    );
    return Exercise;
};
