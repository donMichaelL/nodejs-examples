var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./dishes-1');
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
		description: 'Test'
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
				console.log(dish);

				db.collection('dishes').drop(function(){
					db.close();
				});
			});
		}, 3000);
	});

});