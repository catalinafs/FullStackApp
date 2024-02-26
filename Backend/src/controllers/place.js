const { Place } = require("../models");

const createPlace = async (req, res) => {
    const { body } = req;

    try {
        const place = await Place.findOne({
            where: {
                name: body.name,
            },
            raw: true,
        });

        if (place) {
            return res.status(400).json({ msg: 'El lugar ya existe' });
        }

        await Place.create({ ...body });

        res.status(200).json({ msg: 'Lugar agregado' });
    } catch (err) {
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

module.exports = {
    createPlace
};