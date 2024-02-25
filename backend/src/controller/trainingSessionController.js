import trainingSessionService from "../service/trainingSessionService";
let getAll = async (req, res) => {
    try {
        let data = await trainingSessionService.getAll(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
let create = async (req, res) => {
    try {
        let data = await trainingSessionService.create(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
let update = async (req, res) => {
    try {
        let data = await trainingSessionService.update(req.params.id, req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
let getDetailById = async (req, res) => {
    try {
        let data = await trainingSessionService.getDetailById(req.params.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
let deleteById = async (req, res) => {
    try {
        let data = await trainingSessionService.deleteById(req.params.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
let updatePosition = async (req, res) => {
    try {
        let data = await trainingSessionService.updatePosition(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
module.exports = {
    getAll,
    create,
    update,
    getDetailById,
    deleteById,
    updatePosition,
};
