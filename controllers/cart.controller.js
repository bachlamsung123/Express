var db = require('../db');
var express = require('express');
var app = express();

module.exports.addToCart = function (req, res, next) {
	var productId = req.params.productId;

	var sessionId = req.signedCookies.sessionId;

	if (!sessionId){
		res.redirect('/product');
		return;
	}

	var count = db.get('sessions')
								.find({id: sessionId})
								.get('cart.' + productId, 0)
								.value();

	db.get('sessions')
		.find({ id: sessionId })
		.set('cart.' + productId, count + 1)
		.write();
	
	
	res.redirect('/product');
};