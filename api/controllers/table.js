var Table = require('../models/table');
var Column = require('../models/column');
var Row = require('../models/row');
var reqCb = require('../util/req-cb');

module.exports = {
	getAll: function(req, res, next) {
		Table.find({ product_id: req.params.product_id} )
			.populate('columns')
			.populate('rows')
			.populate('field_values')
			.exec(reqCb(res));
	},

	create: function(req, res, next) {
		var reqBody = req.body;
		var newTable;

		reqBody.columns = reqBody.columns.map(function(column) {
			return new Column(column);
		});

		reqBody.rows = reqBody.rows.map(function(row) {
			return new Row(row);
		});

		newTable = Table(reqBody);

		newTable.save(reqCb(res));
	},

	modify: function(req, res, next) {
		Table.findByIdAndUpdate(req.body._id, req.body.table, reqCb(res));
	},

	deleteTable: function(req, res, next) {
		Table.findOneAndRemove({
			_id: req.params.table_id
		}, reqCb(res));
	},

	addRow: function(req, res, next) {
		Table.update(
			{
				_id: req.body.table_id
			},

			{ 
				$push: {
					rows: new Row(req.body.row)
				}
			},

			reqCb(res)
		)
	},

	editRow: function(req, res, next) {
		Table.findOneAndUpdate(
			{ "_id": req.body.table_id, "rows._id": req.body.row._id },
			{
				"$set": {
					"rows.$": req.body.row
				}
			},
			reqCb(res)
		)
	},

	deleteRow: function(req, res, next) {
		Table.findByIdAndUpdate(req.params.table_id, {
		    $pull: {
		        rows: { 
		        	_id: req.params.row_id
		        }
		    }
		}, reqCb(res));
	}
};