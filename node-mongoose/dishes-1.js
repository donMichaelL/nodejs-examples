var mongoose = require('mongoose');

// #1 define a Schema
var Schema = mongoose.Schema;

// #3 create a Schema
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	}
}, {timestamps: true});


// #4 create a model from Schema
var Dishes = mongoose.model('Dish', dishSchema);

// #5 export the model
module.exports = Dishes;