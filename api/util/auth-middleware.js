var jwt = require('jwt-simple');  
var moment = require('moment');  
var cons = require('../../constants');

module.exports = function(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403)
			.send({message: 'Your request doesnt have authorization header'})
	}

	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, cons.SECRET_TOKEN, true);

	if (payload.exp <= moment().unix()) {
		return res.status(401)
			.send({message: 'The token has espired test', token_expired: true});
	}

	req.user = payload.sub;

	next();
};
