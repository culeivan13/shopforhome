const router = require('express').Router();
const hashUpdatedPassword = require('../middlewares/hashUpdatedPassword');
const { verifyToken, verifyAdmin, verifyAdminOrUser } = require('../middlewares/verifyToken')
const User = require('../models/User');

//ADD A NEW USER
router.post('/add', verifyToken, verifyAdmin, (req, res) => {
    const newUser = User(req.body);
    newUser.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

//GET ALL USERS
router.get('/all', verifyToken, verifyAdmin, (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

//GET A SINGLE USER DETAIL
router.get('/:id', verifyToken, verifyAdminOrUser, (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

//DELETE A USER
router.delete('/:id', verifyToken, verifyAdmin, (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            res.status(200).json({ message: "User Deleted" });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

//UPDATE A USER
router.put("/:id", verifyToken, verifyAdminOrUser, hashUpdatedPassword, (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
    ).then(result => {
        res.status(200).json(result);
    }).catch(err => res.status(500).send(err));
});

module.exports = router;