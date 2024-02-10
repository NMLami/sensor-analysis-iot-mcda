const express = require("express");
const {createUser,userLogin,getAll,verifyUser } = require("../controllers/user-api");
const router = express.Router();




//router.get("/", userAuthenticate, ValidateRequestSchema, getAll);
router.get("/", getAll);
router.get("/verify", verifyUser);
router.post("/register", createUser);
router.post("/login", userLogin);


module.exports = router;