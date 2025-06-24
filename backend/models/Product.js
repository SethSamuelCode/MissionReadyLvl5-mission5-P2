const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   title: String,
   description: String,
   price: Number,
   seller: String,
   condition: String,
   imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);