var Product = require('../models/product.model');

module.exports.index = function (req, res) {

	// var page = parseInt(req.query.page || 1);
	// var perPage = 8;

	// var start = (page - 1) * perPage;
	// var end = page * perPage;

	// var drop = (page - 1) * perPage;

	// res.render('product/index', {
	// 	//products : db.get('products').value().slice(start, end)
	// 	products : db.get('products').drop(drop).take(perPage).value(),
	// 	page : page
	// });
	// //console.log(db.get('products').value());

	Product.find().then(function(products) {
		res.render('product/index',{
			products: products
		})
	});
};

