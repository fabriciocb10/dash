var User = require('../models/user');
var tokenCreator = require('../util/tokenCreator');

module.exports = {
	logIn: function(req, res, next) {
		var response = {
			user: null,
			cedula: false,
			password: false,
			token: null
		};

		User.findOne({ cedula: req.body.cedula }, '+password', function(error, user) {
			if (error) {
				throw error;
			}

			if (user) {
				response.cedula = true;

				user.comparePassword(req.body.password, function(error, isMatch) {
					if (isMatch) {
						response.password = true;
						response.active = user.active;

						if (user.active) {
							response.user = user.toObject();
							response.token = tokenCreator(user._id);

							delete response.user.password;
						}
					
					} else {
						response.password = false;
					}

					res.send(response);
				});
			
			} else {
				res.send(response);
			}
		});
	}
};
