import express from "express";
import trainingRoute from "./trainingRoute";

let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello");
    });
    app.use("/api/training-session", trainingRoute);
    return app.use("/", router);
};
module.exports = initwebRoutes;
