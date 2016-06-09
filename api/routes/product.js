var productController = require('../controllers/product');

module.exports = function(router) {
	router.route('')
		.get(productController.getAll);

	router.route('/create')
		.post(productController.create);

	router.route('/modify')
		.put(productController.modify);

	router.route('/delete/:product_id')
		.delete(productController.deleteProduct);
};
