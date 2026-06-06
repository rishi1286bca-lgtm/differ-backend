const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlistController');
const authMiddleware = require('../middlewear/authMiddleware');

router.get('/', authMiddleware, wishlistController.getWishlist);
router.post('/sync', authMiddleware, wishlistController.syncWishlist);

module.exports = router;