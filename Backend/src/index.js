// Imports
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Config
dotenv.config();
const config = require('./config');

// Routes
const userAPI = require('./router/user');
const placeAPI = require('./router/place');
const visitAPI = require('./router/visit');

// Constants
const app = express();

// App Use
app.use(bodyParser.json());

// App Routes
userAPI(app);
placeAPI(app);
visitAPI(app);

// Listening app
app.listen(config.port, () => {
    console.log('is working on port: ' + config.port);
});