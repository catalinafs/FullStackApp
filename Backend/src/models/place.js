module.exports = (sequelize, DataType) => {
    const Place = sequelize.define('place', {
        id: {
            type: DataType.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataType.STRING(100),
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataType.STRING(150),
        },
        reference: {
            type: DataType.STRING(150),
            allowNull: false,
        },
        placeType: {
            type: DataType.STRING(80),
            allowNull: false,
        },
        state: {
            type: DataType.TINYINIT(4),
            defaultValue: 1,
        },
    },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
        }
    );

    Place.associate = (models) => {
        Place.hasMany(models.Visit, {
            foreignKey: 'id_place',
            as: 'lugaresVisita'
        });
    };

    return Place;
}