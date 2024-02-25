import excerciseService from "../service/excerciseService";

let create = async (req, res) => {
    try {
        let data = await excerciseService.create(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
module.exports = { create };
