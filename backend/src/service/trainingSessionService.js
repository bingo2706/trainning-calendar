import db from "../models/index";
import moment from "moment";
let getAll = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = `
            SELECT TS.*, 
                CASE 
                    WHEN COUNT(Ex.id) > 0 
                    THEN JSON_AGG(
                        CASE 
                            WHEN Ex.id IS NOT NULL 
                            THEN json_build_object(
                                'id', Ex.id,
                                'excercise_name', Ex.excercise_name,
                                'set_info', Ex.set_info,
                                'set_number', Ex.set_number
                            )
                        END
                    )
                    ELSE '[]'::json
                END AS excercises
            FROM "TrainingSessions" TS
            LEFT JOIN "Excercises" Ex ON Ex.session_id = TS.id
            GROUP BY TS.id
            `;

            let result = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
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
            let updatePromises = [];

            sourceList.forEach((item) => {
                updatePromises.push(
                    db.TrainingSession.update(
                        { ...item },
                        {
                            where: {
                                id: item.id,
                            },
                        }
                    )
                );
            });

            if (isDayChange) {
                destinationList.forEach((item) => {
                    updatePromises.push(
                        db.TrainingSession.update(
                            { ...item },
                            {
                                where: {
                                    id: item.id,
                                },
                            }
                        )
                    );
                });
            }

            // Đợi cho tất cả các promise trong mảng updatePromises thực hiện xong
            await Promise.all(updatePromises);

            resolve({
                errCode: 0,
                data: "Update successful",
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
