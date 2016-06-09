var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('../util/validates');

var column = new Schema({
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

	field_value: [String],

	created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

	created_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('column', column);