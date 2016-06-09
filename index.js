/*
*	Index API REST APP
*/

// Dependecies
var express = require('express');
var app = express();
var server = require('./initializers/server');
var db = require('./initializers/db');
var corsInit = require('./initializers/cors');
var helmetInit = require('./initializers/helmet');
var async  = require('async');
var logger = require('winston');
var apiRoutes = require('./api/routes/index');
var appConfig = require('./initializers/app-config');

logger.info('[APP] Starting APP initialization...');

// Running initializers (settings, server and data base)
async.series(
	[
		startDb,
		startConfig,
		startCors,
		startHelmet,
		startRoutes, 
		startServer
	],

	asyncAlways
);

// Data base init function
function startDb(cb) {
	db(cb);
}

// App config init function
function startConfig(cb) {
	appConfig(app, cb);
}

// CORS init configuration function
function startCors(cb) {
	corsInit(app, cb);
}

// Helmet init configuration function
function startHelmet(cb) {
	helmetInit(app, cb);
}

// Routes init function
function startRoutes(cb) {
	apiRoutes(app, cb);
}

// Sever init function
function startServer(cb) {
	server(app, cb);
}

// Initializers callback
// If has an error display an error message, if not, display a success message
function asyncAlways(error) {
	if (error) {
		logger.error('[APP] initialization failed', err);

	} else {
		logger.info('[APP] initialized SUCCESSFULLY');
	}
}