var helmet = require('helmet');
var logger = require('winston');

module.exports = function(app, cb) {
	logger.info('[APP] Helmet Setting...');

	app.use(helmet());

	if (cb) {
		return cb();
	}
}