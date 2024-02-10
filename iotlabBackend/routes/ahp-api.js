const express = require("express");
const { getAll, createData } = require("../controllers/ahp-api");
const router = express.Router();




//router.get("/", userAuthenticate, ValidateRequestSchema, getAll);
router.get("/", getAll);

// router.post("/create", createData);


module.exports = router;