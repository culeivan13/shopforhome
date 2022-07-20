const bcrypt = require("bcrypt");

module.exports = async function hashUpdatedPassword(req, res, next) {
    if (req.body.password) {
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    next();
}