const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus 
} = require('../controller/orderController');
const protect  = require('../middlewear/authMiddleware');  
 
router.post('/', protect, createOrder);                
router.get('/myorders', protect, getUserOrders);       


router.get('/', getAllOrders);                
router.put('/:id/status', updateOrderStatus); 

module.exports = router;