// Imports
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Config
dotenv.config();
const config = require('./config');

// Constants
const app = express();

// App USe
app.use(bodyParser.json());

// Listening app
app.listen(config.port, () => {
    console.log('is working on port: ' + config.port);
});