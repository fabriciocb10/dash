var loginController = require('../controllers/login');

module.exports = function(router) {
	router.route('')
		.post(loginController.logIn)
};
