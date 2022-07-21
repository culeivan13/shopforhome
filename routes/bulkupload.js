const router = require('express').Router();
const fs = require("fs");
const path = require('path');
const { parse } = require("csv-parse");
const Product = require('../models/Product');

router.post('/', (req, res) => {
    fs.createReadStream(path.join(__dirname, '..', '/bulkuploaddata', '/sample.csv'))
        .pipe(parse({ delimiter: ",", from_line: 2, relax_quotes: true }))
        .on("data", function (row) {
            const newProduct = Product({
                title: row[0],
                description: row[1],
                image: row[2],
                category: row[3],
                price: parseInt(row[4]),
                stock: parseInt(row[5])
            });

            newProduct.save()
                .then(result => {
                    console.log("product saved");
                })
                .catch(err => {
                    console.log(err.message);
                });
        })
        .on("end", function () {
            console.log("all products saved");
        })
        .on("error", function (error) {
            console.log(error.message);
        });
    res.status(201).json({ message: "products saved in database" });
});

module.exports = router;