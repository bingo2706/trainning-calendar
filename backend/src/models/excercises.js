"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Excercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Excercise.belongsTo(models.TrainingSession, {
                foreignKey: "session_id",
                targetKey: "id",
                as: "excercises",
            });
        }
    }
    Excercise.init(
        {
            session_id: DataTypes.INTEGER,
            excercise_name: DataTypes.STRING,
            set_info: DataTypes.STRING,
            set_number: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Excercise",
        }
    );
    return Excercise;
};
