const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader != 'undefined') {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ message: "You are not authorized" });
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "You are not authenticated" });
    }
}

function verifyAdmin(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "You are not authorized" });
    }
}

module.exports = { verifyToken, verifyAdmin }
