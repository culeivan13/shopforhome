const router = require('express').Router();
const { verifyToken, verifyAdmin } = require('../middlewares/verifyToken')
const Product = require('../models/Product');

//ADD A NEW PRODUCT
router.post('/add', verifyToken, verifyAdmin, (req, res) => {
    const newProduct = Product(req.body);
    newProduct.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

//GET ALL PRODUCTS
router.get('/all', (req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

//GET A SINGLE PRODUCT
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.status(200).json(product);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

//GET PRODUCTS BY THEIR CATEGORY
router.get('/cat/:category', (req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products.filter(product => product.category === req.params.category));
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

//DELETE A PRODUCT
router.delete('/:id', verifyToken, verifyAdmin, (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(200).json({ message: "Product Deleted" });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

//UPDATE A PRODUCT
router.put("/:id", verifyToken, verifyAdmin, (req, res) => {
    Product.findByIdAndUpdate(
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