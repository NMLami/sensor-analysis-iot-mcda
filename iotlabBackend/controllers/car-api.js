const successResponseHandler = require('../middleware/success-response-handler');
const Car = require('../models/car-api')



exports.createCar = async (req, res, next) => {
    try {
        const { matriculation,manufacturer, enginePower } = req.body;
        const msg = req.body;
        const carData = {matriculation: matriculation, manufacturer: manufacturer, enginePower: enginePower, msg:msg};

        // brandData.active = active ? true : false;
        // brandData.createdBy = req.user._id;

        const car = await Car.create(carData);

        return successResponseHandler(res, 201, "Successfully  created");
    } catch (err) {
        return next(err);
    }
};



exports.getAll = async (req, res, next) => {
    try {
        //const pagination = await getPagination(req, res, next);

        //const { active } = req.query;
        const query = {};

        // if (active === "YES") query.active = true;
        // else if (active === "NO") query.active = false;

        const cars = await Car.find(query, {}, pagination);
        
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            count: cars.length,
            // next: cars.length === pagination.limit ? pagination.skip + pagination.limit : null,
            cars
        });
    } catch (err) {
        return next(err);
    }
};

