const express = require('express');
const { createPlace } = require('../controllers/place');

module.exports = (app) => {
    const router = express.Router();
    app.use('/place', router);

    //? POST
    router.post('/create', createPlace);
}