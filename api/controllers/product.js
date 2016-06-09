var Product = require('../models/product');
var reqCb = require('../util/req-cb');

module.exports = {
	getAll: function(req, res, next) {
		Product.find()
			.exec(reqCb(res));
	},

	create: function(req, res, next) {
		var newProduct = new Product(req.body);

		newProduct.save(reqCb(res));
	},

	modify: function(req, res, next) {
		Product.findByIdAndUpdate(req.body._id, req.body, reqCb(res));
	},

	deleteProduct: function(req, res, next) {
		Product.findOneAndRemove({
			_id: req.params.product_id
		}, reqCb(res));
	}
};
