import express from "express";
import excerciseController from "../controller/excerciseController";
let router = express.Router();

router.post("/", excerciseController.create);

export default router;
