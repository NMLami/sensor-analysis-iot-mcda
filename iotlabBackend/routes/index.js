const express = require("express");
const router = express.Router();


const carApiRouter = require("../routes/car-api");
const sensorApiRouter = require("../routes/sensor-api");
const ahpApiRouter = require("../routes/ahp-api");
const userApiRouter = require("../routes/user-api");








router.use("/api/v1/cars", carApiRouter);
router.use("/api/v1/sensors", sensorApiRouter);
router.use("/api/v1/ahp", ahpApiRouter);
router.use("/api/v1/user", userApiRouter);



router.get("/", (req, res) => {
    res.send("Iot Lab backend health is ok.");
});

router.route("*").all(async (req, res) => {res.send("404 Not Found!")});

module.exports = router;