const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds =10;
const JWT_SECRET = "iot-sensor-project"

const createHashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};
const getToken = async (customerOrUserInfo) => {
    return jwt.sign(customerOrUserInfo, JWT_SECRET);
};

module.exports = { 
    createHashPassword,
     comparePassword,
     getToken,
    // verifyToken,
    // verifyUserToken,
    // authenticate,
    // userAuthenticate,
    // generateRandomPassword
 };