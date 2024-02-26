const { Sequelize, DataTypes } = require('sequelize');
const {
    dbName,
    dbUser,
    dbPassword,
    dbPort,
    dbHost
} = require('../config/index');
const fs = require('fs');
const path = require('path');

const baseName = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql',
    port: dbPort,
    host: dbHost,
});

const listFile = fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf('.') !== 0 && file !== baseName && file.slice(-3) === '.js');
});

listFile.forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);

    db[model.name] = model;
});

Object.keys(db).forEach((model) => {
    if (db[model].associate) {
        db[model].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync().then(() => {
    console.log('holis');
}).catch((error) => console.log(error));

module.exports = db;