const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
    unique: true 
  },
  title: {
    type: String,
    required: true,
    trim: true  
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);