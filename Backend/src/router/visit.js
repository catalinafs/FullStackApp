const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    app.use('/visit');

    //? POST
    router.post('/create', (req, res) => { res.send('holis') });
    
    //? GET
    router.get('/place/:place_id', (req, res) => { res.send('holis') });
    router.get('/user/:user_id', (req, res) => { res.send('holis') });
}