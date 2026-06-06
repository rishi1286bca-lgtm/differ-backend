const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const authMiddleware = require('../middlewear/authMiddleware');

// Secure routes with token verification
router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getOrders); // Gets orders for the logged-in user
module.exports = router;