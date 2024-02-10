const successResponseHandler = async (res, statusCode, message) => {
    return res.status(statusCode).json({
        status: "success",
        statusCode: statusCode,
        message: message
    });
};

module.exports = successResponseHandler;