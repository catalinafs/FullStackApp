const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    app.use('/place')

    //? POST
    router.post('/create', (req, res) => { res.send('holis') });
}