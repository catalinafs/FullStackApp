const express = require('express');
const { createVisit, getUsersFromPlace, getPlacesFromUser } = require('../controllers/visit');

module.exports = (app) => {
    const router = express.Router();
    app.use('/visit');

    //? POST
    router.post('/create', createVisit);

    //? GET
    router.get('/place/:place_id', getUsersFromPlace);
    router.get('/user/:user_id', getPlacesFromUser);
}