const express = require('express');
const {
    createUser,
    login,
    decode,
    updateImageProfile,
} = require('../controllers/user');

module.exports = (app) => {
    const router = express.Router();
    app.use('/user', router);

    //? POST
    router.post('/register', createUser);
    router.post('/login', login);
    router.post('/decode', decode);
    router.post('/imageProfile', updateImageProfile);
    // router.get('/visits/:place_id', getUsersFromPlace);
}