import express from "express";
import trainingRoute from "./trainingRoute";
import excerciseRoute from "./excerciseRoute";
let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello");
    });
    app.use("/api/training-session", trainingRoute);
    app.use("/api/excercise", excerciseRoute);
    return app.use("/", router);
};
module.exports = initwebRoutes;
