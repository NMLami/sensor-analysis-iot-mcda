const express = require("express");
const { getAll, createData,predictionTest } = require("../controllers/sensor-api");
const router = express.Router();




//router.get("/", userAuthenticate, ValidateRequestSchema, getAll);
router.get("/", getAll);
router.post("/create", createData);
router.get("/prediction", predictionTest);


module.exports = router;