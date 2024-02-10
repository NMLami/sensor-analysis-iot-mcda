const AHP = require('ahp')
const successResponseHandler = require('../middleware/success-response-handler');


// import SimpleLinearRegression from 'ml-regression-simple-linear';

exports.getAll = async (req, res, next) => {
    try {
       
        let {temp_hum, temp_sou,hum_sou} = req.query
       

        temp_hum =temp_hum*1;
        temp_sou =temp_sou*1;
        hum_sou =hum_sou*1;
        console.log(temp_hum,temp_sou,hum_sou)
     
        const ahpContext = new AHP();
        
        ahpContext.import({
            items: ['room108', 'room109', 'room110','room210','room211'],
            criteria: ['temperature', 'humidity', 'sound'],
            criteriaItemRank: {
                temperature: [
                    [1, 7, 3,5,5],
                    [1/7, 1, 1/3,1/3,1/3],
                    [1/3, 3, 1,3,3],
                    [1/5, 3, 1/3,1,1],
                    [1/5,3, 1/3,1,1],
                ],
                humidity: [
                   
                    [1, 7, 3,5,5],
                    [1/7, 1, 1/3,1/3,1/5],
                    [1/3, 5, 1,3,3],
                    [1/5, 3, 1/3,1,1],
                    [1/5,5, 1/3,1,1],
                ],
                sound: [
                    [1, 7, 3,5,5],
                    [1/7, 1, 1/5,1/5,1/5],
                    [1/3, 5, 1,3,3],
                    [1/5, 5, 1/3,1,1],
                    [1/5,5, 1/3,1,1],
                ]
            },
            criteriaRank: [
                [1, temp_hum, temp_sou],
                [1/temp_hum, 1, hum_sou],
                [1/temp_sou, 1/hum_sou, 1]
            ]
        });

        let output = ahpContext.run();
        console.log(output.rankedScoreMap);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            data:output.rankedScoreMap
        });
    } catch (err) {
        return next(err);
    }
};



