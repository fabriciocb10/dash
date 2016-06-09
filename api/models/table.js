var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Column = require('./column');
var Row = require('./row');
var User = require('./user');

var table = new Schema({
	name: {
		type: String,
		require: true,
		trim: true
	},

	product_id: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
	},

	columns: [{
		cloumn_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'column'
		},	

		index: Number,

		name: {
			type: String,
			required: true,
			trim: true
		},

		colum_type: {
			type: String,
			required: true,
			enum: ['typed', 'dropdown']
		},

		created_by: {
	        type: mongoose.Schema.Types.ObjectId,
	        ref: 'user'
	    },

		created_at: {
			type: Date,
			default: Date.now
		}
	}],

	rows: [{
		row_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'row',
		},

		index: Number,

		period: {
			type: Number,
			required: true
		},

		month: {
			type: String,
			required: true,
			enum: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
		},

		week: {
			type: Number,
			required: true,
			enum: [1, 2, 3, 4]
		},
			
		field_values: [{
			value: String,
			column: String,
			index: Number
		}],

		created_by: {
	        type: mongoose.Schema.Types.ObjectId,
	        ref: 'user'
	    },

		created_at: {
			type: Date,
			default: Date.now
		}
	}],

	created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

	created_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose
.model('table', table);