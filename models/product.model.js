var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	price: Number
})


var Product = mongoose.model('User', productSchema, 'products');

module.exports = Product;