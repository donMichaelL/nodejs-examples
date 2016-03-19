var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./dishes-2');
var url = 'mongodb://localhost:27017/conFusion';

// #1
mongoose.connect(url);

// #2
var db = mongoose.connection;

// #3
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
	Dishes.create({
		name: 'Uthapizza',
		description: 'Test',
		comments: [{
			rating: 3,
			comment: 'Hello',
			author: 'Michael'
		}]
	},function(err, dish){
		if(err) throw err;

		console.log('Dish Created');
		console.log(dish);
		var id = dish._id;

		setTimeout(function(){
			Dishes.findByIdAndUpdate(id, {$set:{description: 'Update Test'}}, {new:true})
			.exec(function(err, dish){
				if(err) throw err;
				console.log('Updated');

				// Push and then Save the dish
				dish.comments.push({
					rating: 5,
					comment: 'This is a new comment',
					author: 'Loukeris'
				});

                dish.save(function (err, dish) {
	                console.log('Updated Comments!');
	                console.log(dish);
					db.collection('dishes').drop(function(){
						db.close();
					});
	            });

			});
		}, 3000);
	});

});