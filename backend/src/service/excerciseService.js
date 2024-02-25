import db from "../models/index";

let create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let excercise = await db.Excercise.create({ ...data });
            resolve({
                errCode: 0,
                data: excercise,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    create,
};
