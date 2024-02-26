const { sequelize, User } = require("../models");

const createUser = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { name, email, password } = req.body;

        const createUser = await User.create(
            { ...body },
            {
                transaction,
            }
        );

        await transaction.commit();
        return res.status(200).json({
            msg: 'Usuario registrado'
        });
    } catch (error) {
        await transaction.rollback;

        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

module.exports = {
    createUser
};