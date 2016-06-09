var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cedulaRegex = /[0-9 ]\-([0-9 ]{4})\-[0-9]{4}/;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var user = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	last_name_1: {
		type: String,
		required: true,
		trim: true
	},

	last_name_2: {
		type: String,
		required: true,
		trim: true
	},

	cedula: {
		type: String,
		required: true,
		unique: true,
		match: cedulaRegex
	},

	email: {
		type: String,
		required: true,
		unique: true,
		match: emailRegex
	},

	password: {
		type: String,
		select: false,
		required: true
	},

	phone: {
		type: String,
		required: true,
		unique: true
	},

	rol: {
		type: String,
		required: true,
		enum: ['admin', 'editor', 'viewer'],
		default: 'viewer'
	},

	active: {
		type: Boolean,
		default: false
	},

	created_at: {
		type: Date,
		default: Date.now
	}
});

user.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) {
    	return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
        	return next(err);
        }

        bcrypt.hash(user.password, salt,

        function() {

        }, function(err, hash) {
            if (err) {
            	return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

user.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
        	return cb(err);
        }

        if (cb) {
        	cb(null, isMatch);
        };
    });
};


module.exports = mongoose.model('user', user);