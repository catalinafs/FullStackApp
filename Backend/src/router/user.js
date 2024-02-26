const express = require('express');
const { User } = require('../models');

module.exports = (app) => {
    const router = express.Router();
    app.use('/user', router);

    //? POST
    router.post('/register', (req, res) => {
        User.findOne();
        res.send('holis');
    });
    router.post('/login', (req, res) => { res.send('holis') });
    router.post('/decode', (req, res) => { res.send('holis') });
    router.post('/imageProfile', (req, res) => { res.send('holis') });
    router.get('/visits/:place_id', (req, res) => { res.send('holis') });
}