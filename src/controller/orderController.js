const Order = require('../model/order.model');

// 1. Create Order
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    const order = new Order({
      orderItems,
      shippingAddress,
      totalPrice,
      user: req.user.id // Token se aayi hui User ID yahan save hogi
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// 2. Get Logged-In User's Orders
const getUserOrders = async (req, res) => {
  try {
    // Sirf wahi orders fetch karega jiski user ID token wali ID se match karti hai
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }); 
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// 3. Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    // .populate('user', 'name email') karne se admin ko customer ka naam bhi dikh jayega
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};

// 4. Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (order) {
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};

module.exports = { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus 
};