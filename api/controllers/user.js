var User = require('../models/user');
var reqCb = require('../util/req-cb');
var crypto = require('crypto');

module.exports = {
	getAll: function(req, res, next) {
		User.find()
			.exec(reqCb(res));
	},

	getById: function(req, res, next) {
		User.findById(req.params.user_id)
			.exec(reqCb(res));
	},

	create: function(req, res, next) {
		var newUser = new User(req.body);

		newUser.save(reqCb(res));
	},

	edit: function(req, res, next) {
		User.findByIdAndUpdate(req.body._id, req.body, reqCb(res));
	},

	deleteUser: function(req, res, next) {
		User.findOneAndRemove({
			_id: req.params.user_id
		}, reqCb(res));
	}
};
