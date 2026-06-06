const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true 
    },
    items: [{
        productId: { type: String, required: true },
        name: String,
        price: String, // String to match your frontend "$XX.XX" format or parsed floats
        image: String,
        size: String,
        quantity: { type: Number, default: 1 }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);