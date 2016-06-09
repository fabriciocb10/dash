var changeCase = require('change-case');
var express = require('express');
var routes = require('require-dir')();
var authMiddleware = require('../util/auth-middleware');

module.exports = function(app, cb) {
	Object.keys(routes).forEach(function(routeName) {
		var router = express.Router();

		if (changeCase.paramCase(routeName) != 'login') {
			router.use(authMiddleware);
		};

		require('./' + routeName)(router);

		app.use('/' + changeCase.paramCase(routeName), router);
	});

	if (cb) {
		cb();
	}
}