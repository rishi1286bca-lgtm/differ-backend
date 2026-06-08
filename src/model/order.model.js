const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Yeh line add karni hai user identify karne ke liye
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: false },
      price: { type: String, required: true },
      size: { type: String }
    }
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true }
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    default: 'Processing', 
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);