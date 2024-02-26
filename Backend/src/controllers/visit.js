const { User, Place, Visit } = require("../models");
const jwt = require('jsonwebtoken');

const createVisit = async (req, res) => {
    const { body } = req;

    try {
        const decode = jwt.verify(body.token, process.env.SECRET_KEY);

        const user = await User.findOne({
            where: {
                email: decode.email,
            },
            raw: true,
        });

        if (!user) {
            return res.status(400).json({ msg: 'el usuario no existe' });
        }

        if (user.id !== decode.id) {
            return res.status(400).json({ msg: 'el usuario no existe' });
        }

        const place = await Place.findOne({
            where: {
                name: body.placeToVisit,
            },
            raw: true,
        });

        if (!place) {
            return res.status(400).json({ msg: 'el lugar no existe' });
        }

        await Visit.create({
            id_user: user.id,
            id_place: place.id,
        });

        res.status(200).json({ msg: decode });
    } catch (err) {
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const getUsersFromPlace = async (req, res) => {
    const { params } = req;

    try {
        const allVisits = await Visit.findAll({
            where: { id_place: params.place_id },
            include: [{ model: User, as: 'usuarios', attributes: { exclude: ['password'] } }],
        });
        console.log(allVisits)

        if (!allVisits || allVisits.length === 0) {
            return res.status(400).json({ msg: 'El lugar no ha sido visitado' });
        }

        res.status(200).json({ msg: allVisits });
    } catch (err) {
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const getPlacesFromUser = async (req, res) => {
    const { params } = req;

    try {
        const allPlaces = await Visit.findAll({
            where: { id_user: params.user_id },
            include: [{ model: Place, as: 'place-visit' }],
        });

        if (!allPlaces || allPlaces.length === 0) {
            return res.status(400).json({ msg: 'El usuario no ha visitado ningun lugar' });
        }

        res.status(200).json({ msg: allPlaces });
    } catch (err) {
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

module.exports = {
    createVisit,
    getUsersFromPlace,
    getPlacesFromUser,
};