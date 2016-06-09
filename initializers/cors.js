var cors = require('cors');
var appConst = require('../constants');
var logger = require('winston');

var corsOptions = {
	origin: function(origin, callback){
		var originIsWhitelisted = appConst.ORIGINS.indexOf(origin) !== -1;
		
		callback(null, originIsWhitelisted);
	}
};

module.exports = function(app, cb) {
	logger.info('[APP] CORS Setting...');

	//app.use(cors(corsOptions));
	app.use(cors());

	if (cb) {
		return cb();
	}
}