const Order = require('../model/order.model'); 
const Product = require('../model/product.model');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { products } = req.body;
    
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    let totalPrice = 0;
    const populatedProducts = [];

    for (const item of products) {
      if (!item.product || !item.quantity || item.quantity < 1) {
        return res.status(400).json({ message: 'Invalid product entry' });
      }
      const prod = await Product.findById(item.product).select('price');
      if (!prod) return res.status(404).json({ message: 'Product not found: ' + item.product });
      
      totalPrice += prod.price * item.quantity;
      populatedProducts.push({ product: item.product, quantity: item.quantity });
    }

    const order = new Order({ user: userId, products: populatedProducts, totalPrice });
    await order.save();
    return res.status(201).json(order);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error placing order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate('products.product').sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: 'Server error fetching orders' });
  }
};