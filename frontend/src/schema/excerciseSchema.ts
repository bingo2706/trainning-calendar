import Joi from "joi";

export const excerciseValidationSchema = Joi.object({
    excercise_name: Joi.string().required().label("Tên bài tập"),
    set_info: Joi.string().required().label("Thông tin set"),
    set_number: Joi.string().required().label("Số set"),
}).unknown();
