var shortid = require('shortid');

var db = require('../db');
var express = require('express');
var app = express();

module.exports = function (req, res, next) {
	if (!req.signedCookies.sessionId)
	{
		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, {
			signed: true
		});
		db.get('sessions').push({
			id: sessionId
		}).write();	
	}
	
	var carts = db.get('sessions').value();
	var count = 0;
	if (carts[0] !== undefined)
	{
			for (product in carts[0].cart){
				count += carts[0].cart[product];
			}
	}
	res.locals.cartNumber = count;
	next();
}