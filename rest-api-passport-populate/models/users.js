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
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	admin: {
		type: Boolean,
		default: false
	}
}, {timestamps: true});

userSchema.methods.getName = function(){
	return (this.firstname + ' ' + this.lastname);
};

userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', userSchema);