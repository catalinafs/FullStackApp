module.exports = (sequelize, DataTypes) => {
    const ValoresParametros = sequelize.define('ValorParametros',
        {
            id: {
                type: DataTypes.BIGINT(20),
                primaryKey: true,
                autoIncrement: true,
            },
            valor_parametro: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            id_parametros: {
                type: DataTypes.BIGINT(20),
                allowNull: false,
            },
            estado: {
                type: DataTypes.TINYINT(4),
                defaultValue: 1,
            },
        },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
        }
    );

    ValoresParametros.associate = (models) => {
        ValoresParametros.belongsTo(models.Parametros, {
            foreignKey: 'id_parametros',
            as: 'parametros',
        });
    }

    return ValoresParametros;
}