const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, MONGO_DB_NAME, MONGO_CLUSTER, NODE_ENV } = require("./config");

const mongoConnectionUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/?retryWrites=true&w=majority`;

const mongoURL = NODE_ENV === "local_development" ? `mongodb://localhost:27017/iotLab` : ( NODE_ENV === "development" ? mongoConnectionUrl : mongoConnectionUrl);
const createDBConnection = async () => { 
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connected to Database"))
    .catch((e) => {
        console.log(e);
    });
};

module.exports = { createDBConnection };

//For production server connection
// const mongoose = require("mongoose");
// const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config");

// const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
// const connection = mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })
// .then(() => console.log("successfully connected to Database"))
// .catch((e) => {
//     console.log(e);
// });

// module.exports = connection;


// For local db connection 
// const mongoURL = `mongodb://localhost:27017/gems`;
// const createDBConnection = async () => { 
//     mongoose.connect(mongoURL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log("Successfully connected to Database"))
//     .catch((e) => {
//         console.log(e);
//     });
// };

// module.exports = createDBConnection;