module.exports = (sequelize, DataType) => {
    const Visit = sequelize.define('visit', {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        id_user: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        id_place: {
            type: DataType.INTEGER,
            allowNull: false,
        },
    },
        {
            updatedAt: false,
            freezeTableName: true,
        }
    );

    Visit.associate = (models) => {
        Visit.belongsTo(models.User, {
            foreignKey: 'id_user',
            as: 'usuarios',
            onDelete: 'CASCADE',
        });

        Visit.belongsTo(models.Place, {
            foreignKey: 'id_place',
            as: 'lugares',
            onDelete: 'CASCADE',
        });
    };

    return Visit;
}