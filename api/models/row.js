var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var row = new Schema({
	index: Number,

	month: {
		type: String,
		required: true,
		enum: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
	},

	period: {
		type: Number,
		required: true
	},
	
	field_values: [{
		value: {
			type: String,
			required: true,
			default: 0
		},

		column: {
			type: String,
			required: true,
		},

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
});

module.exports = mongoose.model('row', row);