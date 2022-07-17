const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: { type: Array }
});

module.exports = mongoose.model("wishlist", wishListSchema);