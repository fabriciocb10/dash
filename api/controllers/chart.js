var Table = require('../models/table');
var reqCb = require('../util/req-cb');

module.exports = {
	getChartTable: function(req, res, next) {
		Table.find({ product_id: req.params.product_id} )
			.populate('columns')
			.populate('rows')
			.populate('field_values')
			.exec(reqCb(res));
	}
};