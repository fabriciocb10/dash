/*
*	MongoDB data base initialize
*/

// Dependencies
var mongoose = require('mongoose');
var db = mongoose.connection;
var logger = require('winston');
var appConst = require('../constants');

module.exports = function(cb) {
	// Mogoose connetion to the data base
	if (appConst.DB_NAME) {
		// Data base on error connection
		db.on('error', console.error.bind(console, 'connection error:'));

		// Data base on open connection (when the connect success)
		db.once('open', function() {
			logger.info('[DB] Connected to DB');
		});

		logger.info('[DB] Setting...');
		mongoose.connect(appConst.DB_URI);
	
	} else {
		logger.info('[DB] Data base is not defined');
	}

	if (cb) {
		return cb();
	}
}