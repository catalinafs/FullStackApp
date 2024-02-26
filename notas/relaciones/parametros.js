module.exports = (sequelize, DataType) => {
    const Parametros = sequelize.define('parametro', {
        id: {
            type: DataType.BIGINT(20),
            primaryKey: true,
            autoIncremente: true,
        },
        nombre_parametro: {
            type: DataType.STRING(20),
            allowNull: false,
        },
        estado: {
            type: DataType.TINYINT(4),
            defaultValue: 1,
        }
    },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
        }
    );

    Parametros.associate = (models) => {
        Parametros.hasMany(models.ValoParametros, {
            foreignKey: 'id_parametros',
            as: 'valoresParametros',
        });
    }

    return Parametros;
};