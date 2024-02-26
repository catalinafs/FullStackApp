module.exports = (sequelize, DataType) => {
    const User = sequelize.define('user', {
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
            type: DataType.TINYINIT(4),
            defaultValue: 1,
        }
    },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
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