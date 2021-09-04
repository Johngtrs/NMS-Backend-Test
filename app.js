require("dotenv").config();
const express = require("express");
const app = express();
const movieRouter = require("./v1/routers/movie");
const tools = require("./tools");

app.use(express.json());

// Check API-KEY 
app.use(function (req, res, next) {
    if (!req.headers.authorization || req.headers.authorization != process.env.API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
});

// Trimmer
app.use(function (req, res, next) {
    tools.trimAll(req, res, next);
});

app.use("/v1", movieRouter);

app.listen(process.env.NODE_DOCKER_PORT, () => {
    console.log(`application running on port ${process.env.NODE_DOCKER_PORT}`)
});