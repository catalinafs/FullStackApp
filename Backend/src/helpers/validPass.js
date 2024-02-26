const bcrypt = require('bcrypt');

const ValidPass = (passUser, passDB) => {
    return bcrypt.compareSync(passUser, passDB);
}

module.exports = ValidPass;