var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
	name: {
		type: String,
		require: true,
		unique: true,
		trim: true
	},

	created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

	created_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('product', product);