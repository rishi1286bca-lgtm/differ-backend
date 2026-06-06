const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const authMiddleware = require('../middlewear/authMiddleware');

router.get('/', authMiddleware, cartController.getCart);
router.post('/sync', authMiddleware, cartController.syncCart);

module.exports = router;