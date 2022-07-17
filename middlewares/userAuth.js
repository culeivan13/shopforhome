const bcrypt = require('bcrypt');
const User = require('../models/User');

//AUTHENTICATE USER/ADMIN
function userAuth(req, res, next) {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) return res.send(500).send(err);
                    if (result) {
                        req.user = user;
                        next();
                    } else {
                        res.status(401).json({ message: "Incorrect Password" });
                    }
                });
            } else {
                res.status(401).json({ message: "Invalid Username" });
            };
        })
        .catch(err => res.status(500).send(err));
}

module.exports = userAuth;