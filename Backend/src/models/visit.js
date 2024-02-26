module.exports = (sequelize, DataType) => {
    const Visit = sequelize.define('Visit', {
        id: {
            type: DataType.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        id_user: {
            type: DataType.BIGINT(20),
            allowNull: false,
        },
        id_place: {
            type: DataType.BIGINT(20),
            allowNull: false,
        },
    },
        {
            updatedAt: false,
            freezeTableName: true,
            tableName: 'visit',
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