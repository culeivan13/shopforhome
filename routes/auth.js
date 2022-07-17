const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userAuth = require('../middlewares/userAuth');
const { verifyToken, verifyAdmin } = require('../middlewares/verifyToken');

//REGISTER USER
router.post('/register', (req, res) => {
    const newUser = User(req.body);
    newUser.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

//LOGIN USER
router.post('/login', userAuth, (req, res) => {
    const token = jwt.sign({ id: req.user._id, isAdmin: req.user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

//PROTECTED USER ROUTE
router.get('/test', verifyToken, (req, res) => {
    res.send('user is authorized');
});

//PROTECTED ADMIN ROUTE
router.get('/admin', verifyToken, verifyAdmin, (req, res) => {
    res.send('admin is authorized');
});


module.exports = router;