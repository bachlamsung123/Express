var db = require('../db');
var md5 = require('md5');
var express = require('express');
var app = express();

module.exports.login = function (req, res) {
	res.render('auth/login');
};

module.exports.postLogin = function (req, res) {
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({ email: email }).value();

	if (!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist.'
			],
			values: req.body,
			cartNumber: app.locals.cartNumber
		});
		return;
	}

	if (user.password !== md5(password)){
		res.render('auth/login', {
			errors: [
				'Wrong password.'
			],
			values: req.body,
			cartNumber: app.locals.cartNumber
		});
		return;
	}

	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/users');

}