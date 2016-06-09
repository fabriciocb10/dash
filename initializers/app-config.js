var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var logger = require('winston');
var cons = require('../constants');

module.exports = function(app, cb) {
	//app.use(morgan('common'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(onError);
	app.use(express.static(path.join(cons.ROOT)));

	logger.info('[APP] Setting...');
	
	if (cb) {
		return cb();
	}
}

// Error handler function definition
function onError(err, req, res, next) {
	res.status(err.status || 500);

    res.json({
    	message: err.message
    });

    next(err);
};