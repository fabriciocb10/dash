module.exports = function reqCb(res) {
	return function(error, item) {
		if (error) {
			res.send(error);
		
		} else {
			res.send(item);
		}
	}
}