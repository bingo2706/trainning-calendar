import db from "../models/index";

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
            let trainingSession = await db.TrainingSession.create({
                session_date,
                workout_name,
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
module.exports = {
    getAll,
    create,
    update,
    getDetailById,
    deleteById,
};
