const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true 
    },
    items: [{
        productId: { type: String, required: true },
        name: String,
        price: String,
        image: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);