const Cart = require('../model/cart.model');

// Fetch user's cart
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }
        res.status(200).json(cart.items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart" });
    }
};

// Sync whole cart array from frontend to database
exports.syncCart = async (req, res) => {
    try {
        const { items } = req.body;
        
        let cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            cart.items = items;
            await cart.save();
        } else {
            cart = await Cart.create({ user: req.user.id, items });
        }
        res.status(200).json(cart.items);
    } catch (error) {
        res.status(500).json({ message: "Error syncing cart" });
    }
};