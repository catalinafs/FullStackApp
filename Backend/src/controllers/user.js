const {
    sequelize,
    User,
    Visit,
} = require("../models");
const jwt = require('jsonwebtoken');
const ValidPass = require('../helpers/validPass');
const bcrypt = require('bcrypt');
const { keyToken } = require("../config");

const createUser = async (req, res) => {
    const { body } = req;

    const transaction = await sequelize.transaction();

    try {
        const user = await User.findOne({
            where: { email: body.email },
            raw: true,
        });

        if (user) {
            return res.status(400).json({ msg: 'el usuario ya existe' });
        }

        body['password'] = bcrypt.hashSync(body.password, 10);

        await User.create({ ...body }, { transaction });

        await transaction.commit();

        return res.status(200).json({
            msg: 'Usuario registrado',
        });
    } catch (error) {
        console.log(error.message);

        await transaction.rollback();

        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.findOne({
            where: {
                email: email,
            },
            raw: true,
        });

        if (!userData) {
            return res.status(400).json({ msg: 'Usuario no registrado' });
        }

        if (!ValidPass(password, userData.password)) {
            return res.status(400).json({ msg: 'Usuario no registrado' });
        }

        const encode = jwt.sign(userData, keyToken);

        res.status(200).json({
            msg: 'Token creado exitosamente',
            token: encode
        });
    } catch (err) {
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const decode = async (req, res) => {
    const { token } = req.body;

    try {
        const decode = jwt.verify(token, keyToken);

        const user = await User.findOne({
            where: {
                email: decode.email,
            },
            raw: true,
        });

        if (!user) {
            return res.status(400).json({ msg: 'Token erroneo' });
        }

        if (decode.id !== user.id) {
            return res.status(400).json({ msg: 'Token erroneo' });
        }

        let userData = { ...user };

        delete userData.password;

        res.status(200).json({ user: userData });
    } catch (err) {
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const updateImageProfile = (req, res) => {
    const { image } = req.body;

    res.status(200).json({ msg: 'no esta terminado esto aun, asjajsjs' });
}

module.exports = {
    createUser,
    login,
    decode,
    updateImageProfile,
};