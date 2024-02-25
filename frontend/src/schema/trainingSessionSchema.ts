import Joi from "joi";

export const trainingSessionValidationSchema = Joi.object({
    workout_name: Joi.string().required().label("Tên phiên tập"),
    session_date: Joi.date().required().label("Ngày phiên tập"),
}).unknown();
