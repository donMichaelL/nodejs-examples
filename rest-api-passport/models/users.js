var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	admin: {
		type: Boolean,
		default: false
	}
}, {timestamps: true});

userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', userSchema);