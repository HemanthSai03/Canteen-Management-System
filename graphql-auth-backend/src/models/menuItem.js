const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {  // Updated field name to match GraphQL schema
    type: String, 
  },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
