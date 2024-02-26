module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
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
        email: {
            type: DataType.STRING(500),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataType.STRING(500),
            allowNull: false,
        },
        state: {
            type: DataType.TINYINT(4),
            defaultValue: 1,
        }
    },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
            tableName: 'user',
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Visit, {
            foreignKey: 'id_user',
            as: 'usuariosVisitas',
        });
    };

    return User;
};