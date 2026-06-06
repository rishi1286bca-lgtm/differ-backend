const Wishlist = require('../model/wishlist.model');

// Fetch user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user.id, items: [] });
        }
        res.status(200).json(wishlist.items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching wishlist" });
    }
};

// Sync whole wishlist array from frontend to database
exports.syncWishlist = async (req, res) => {
    try {
        const { items } = req.body;
        
        let wishlist = await Wishlist.findOne({ user: req.user.id });
        if (wishlist) {
            wishlist.items = items;
            await wishlist.save();
        } else {
            wishlist = await Wishlist.create({ user: req.user.id, items });
        }
        res.status(200).json(wishlist.items);
    } catch (error) {
        res.status(500).json({ message: "Error syncing wishlist" });
    }
};