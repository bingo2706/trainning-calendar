import express from "express";
import bodyParser from "body-parser";
require("dotenv").config();

let app = express();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port : " + port);
});
