const successResponseHandler = require('../middleware/success-response-handler');
const Sensor = require('../models/sensor-api')
const SimpleLinearRegression = require('ml-regression-simple-linear');


exports.createData = async (req, res, next) => {
    try {
        const { rooms,sensors } = req.body;
        console.log(req.body);
        
        const sensorData = {rooms: rooms, sensors: sensors};

        // brandData.active = active ? true : false;
        // brandData.createdBy = req.user._id;

        const data = await Sensor.create(sensorData);

        return successResponseHandler(res, 201, "Successfully  created");
    } catch (err) {
        return next(err);
    }
};



exports.getAll = async (req, res, next) => {
    try {
        //const pagination = await getPagination(req, res, next);

        const { roomId,limit } = req.query;
        const query = {};
        let doclimit =24;
        // if (active === "YES") query.active = true;
        // else if (active === "NO") query.active = false;
        if(limit || roomId ){
            doclimit=1
        }
        const sensorDatas = await Sensor.find(query).limit(doclimit).sort({"createdAt": -1});
        
        if(roomId){
            const rooms = sensorDatas[0].rooms;
            const filterRoom = rooms.find(room => room.roomId == roomId);
            console.log(filterRoom)
            sensorDatas[0].rooms = filterRoom;
        }
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            count: sensorDatas.length,
            // next: cars.length === pagination.limit ? pagination.skip + pagination.limit : null,
            sensorDatas
        });
    } catch (err) {
        return next(err);
    }
};


exports.predictionTest = async (req, res, next) => {

    try{
        const {roomId} = req.query
    let x = [];
    let y = [];
    let result =[];
    for (let i = 0; i <= 24; i++) {
        x.push(i);
      }

    const sensorDatas = await Sensor.find({}).limit(25).sort({"createdAt": -1});;
    
    for(let i = 0; i <= 24; i++){
       const rooms = sensorDatas[i].rooms;
       const filterRoom = rooms.find(room => room.roomId == roomId);
       const random = Math.floor(Math.random() * (10 - 1 + 1) + 1)
       y.push(filterRoom.temp+random);
    }

    //   return  res.json({
    //     sensorDatas
    // })
    // const y = [0, 1, 2, 3, 4];
    
    const regression = new SimpleLinearRegression(x, y);
    
    regression.slope // 2
    regression.intercept // -1
    regression.coefficients // [-1, 2]
    
    regression.predict(3); // 5
    regression.computeX(3.5); // 2.25
    
    regression.toString(); // 'f(x) = 2 * x - 1'
    
    regression.score(x, y);
    // { r: 1, r2: 1, chi2: 0, rmsd: 0 }
    
    const json = regression.toJSON();
    // { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
    const loaded = SimpleLinearRegression.load(json);
    const A = loaded.predict(9) // 9

    for(let i = 0; i <= 24; i++){
        const A = loaded.predict(i);
        result.push(A);
     }

     return res.json({
        status: "success",
        statusCode: 200,
        prediction :result
     })
    }catch (err) {
        return next(err);
    }
};

