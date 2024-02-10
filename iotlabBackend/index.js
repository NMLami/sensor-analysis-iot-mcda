const express = require("express");
const cors = require('cors');
const helmet = require("helmet");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());

const { createDBConnection } = require("./config/db");
const errorHandler = require("./middleware/error-handler");
const indexRoutes = require("./routes/index");

createDBConnection();

app.use(indexRoutes);

// Handling Errors
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));