const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  excerpt: {
    type: String, 
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  date: {
    type: String, 
    default: () => {
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      return new Date().toLocaleDateString('en-US', options).toUpperCase();
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);