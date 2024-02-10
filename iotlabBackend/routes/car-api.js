const express = require("express");
const { getAll, createCar } = require("../controllers/car-api");
const router = express.Router();




//router.get("/", userAuthenticate, ValidateRequestSchema, getAll);
router.get("/", getAll);
router.post("/create", createCar);


module.exports = router;