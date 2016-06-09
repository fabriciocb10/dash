var chartController = require('../controllers/chart');

module.exports = function(router) {
	router.route('/:product_id')
		.get(chartController.getChartTable);
};