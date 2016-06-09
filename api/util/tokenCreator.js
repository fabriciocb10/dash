var jwt = require('jwt-simple');  
var moment = require('moment');  
var cons = require('../../constants');

module.exports = function(_userId) {
	var payload = {
		sub: _userId,
		iat: moment().unix(),
		exp: moment().add(1, 'hour').unix()
	};

	return jwt.encode(payload, cons.SECRET_TOKEN);
};
