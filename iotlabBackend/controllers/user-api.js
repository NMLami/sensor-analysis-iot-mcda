const successResponseHandler = require('../middleware/success-response-handler');
const { createHashPassword, comparePassword, getToken, verifyUserToken } = require("../Services/auth-service");

const User = require('../models/user-api');
const getPagination = require('../helper/pagination-helper');



exports.createUser = async (req, res, next) => {
    try {
        const {email, password } = req.body;
        const userData = { email,active: false };

        userData.password = await createHashPassword(password);

        await User.create(userData);

        return successResponseHandler(res, 201, "Successfully user created");
    } catch (err) {
        return next(err);
    }
};

exports.userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email: email});
        
        if (!user) {
            const customError = new Error("Invalid email/password");
            customError.statusCode = 400;
            return next(customError);
        }

        if (!user.active) {
            const customError = new Error("Administation is reviewing you request");
            customError.statusCode = 400;
            return next(customError);
        }

        if (await comparePassword(password, user.password)) {
            
        const token = await getToken({
                _id: user._id,
                name: user.name,
                email: user.email,
                userType:user.userType
            });

            return res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "Successfully loggedIn",
                token: token
            });

        } else {
            const newCustomError = new Error("Wrong password");
            newCustomError.statusCode = 400;
            return next(newCustomError);
        }

    } catch (err) {
        return next(err);
    }
};


exports.getAll = async (req, res, next) => {
    try {
        const pagination = await getPagination(req, res, next);

        const { active, searchKeyword } = req.query;
        const query = {};

        if (searchKeyword) {
            let regExSearch = new RegExp(searchKeyword, 'i');

            query.name = regExSearch;
        }

        if (active === "YES") query.active = true;
        else if (active === "NO") query.active = false;

        const users = await User.find(query, {
            name: 1,
            email: 1,
            active: 1,
            userType: 1,
            createdAt: 1
        }, pagination);
        
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            count: users.length,
            next: users.length === pagination.limit ? pagination.skip + pagination.limit : null,
            users
        });
    } catch (err) {
        return next(err);
    }
};

exports.verifyUser = async (req, res, next) => {
    try {

        const { email } = req.query;

        let user = await User.findOneAndUpdate({email:email}, {active:true});

        return successResponseHandler(res, 201, "Successfully user updated");
    } catch (err) {
        return next(err);
    }
};
