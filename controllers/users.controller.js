var db = require('../db');
var shortid = require('shortid');
var express = require('express');
var app = express();

module.exports.index = function (req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	});
};

module.exports.getCreate = function(req, res){
	res.render('users/create');
};

module.exports.postCreate = function(req, res) {
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');

	db.get('users').push(req.body).write();
	res.redirect('/users');
};

module.exports.viewUser = function(req, res) {
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();
	
	if (user.avatar.search('../') !== 0) 
		user.avatar = '../' + user.avatar;

	res.render('users/view', {
		user: user
	});
};

module.exports.searchUser = function(req, res) {
	var q = req.query.q;
	
	var matchedUsers = db.get('users').filter(function(user) {
			return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	}).value();	

	res.render('users/index', {
		users: matchedUsers
	});

};