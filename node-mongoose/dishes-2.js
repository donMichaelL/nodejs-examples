var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
}, {timestamps:true});


var dishScema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true,
		unique: true
	},
	// WE ADD THE RELATIONSHIP
	comments: [commentSchema]
}, {timestamps: true});

var Dishes = mongoose.model('Dish', dishScema);

module.exports = Dishes;