import express from "express";
import trainingSessionController from "../controller/trainingSessionController";

let router = express.Router();

router.post("/", trainingSessionController.create);
router.get("/", trainingSessionController.getAll);
router.get("/:id", trainingSessionController.getDetailById);
router.put("/:id", trainingSessionController.update);
router.delete("/:id", trainingSessionController.deleteById);
export default router;
