import db from "../models/index";
import moment from "moment";
let getAll = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            let trainingSession = await db.TrainingSession.findAll({});
            resolve({
                errCode: 0,
                data: trainingSession,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { session_date, workout_name } = data;
            let query = `
            SELECT COUNT(*)
            FROM "TrainingSessions"
            WHERE TO_CHAR("session_date", 'YYYY-MM-DD') = :session_date
            `;

            let taskCount = await db.sequelize.query(query, {
                replacements: { session_date: session_date },
                type: db.sequelize.QueryTypes.SELECT,
            });
            taskCount = parseInt(taskCount[0].count);

            let trainingSession = await db.TrainingSession.create({
                session_date,
                workout_name,
                position: taskCount > 0 ? taskCount : 0,
            });
            resolve({
                errCode: 0,
                data: trainingSession,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let update = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let trainingSession = await db.TrainingSession.findOne({
                where: { id },
                raw: false,
            });
            trainingSession.set({ ...data });
            let result = await trainingSession.save();
            resolve({
                errCode: 0,
                data: result,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let getDetailById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let trainingSession = await db.TrainingSession.findOne({
                where: { id },
            });
            resolve({
                errCode: 0,
                data: trainingSession,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await db.TrainingSession.destroy({
                where: {
                    id,
                },
            });
            resolve({
                errCode: 0,
                data: result,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let updatePosition = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { sourceList, destinationList, isDayChange } = data;
            let result;
            sourceList.forEach(async (item) => {
                await db.TrainingSession.update(
                    { ...item },
                    {
                        where: {
                            id: item.id,
                        },
                    }
                );
            });

            if (isDayChange) {
                destinationList.forEach(async (item) => {
                    await db.TrainingSession.update(
                        { ...item },
                        {
                            where: {
                                id: item.id,
                            },
                        }
                    );
                });
            }

            resolve({
                errCode: 0,
                data: result,
            });
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    getAll,
    create,
    update,
    getDetailById,
    deleteById,
    updatePosition,
};
