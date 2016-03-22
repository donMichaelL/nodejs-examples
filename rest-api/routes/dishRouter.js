var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// DISHES
dishRouter.route('/')
.get(function(req, res, next){
	Dishes.find({}, function (err, dish) {
			if (err) { console.log('hello'); throw err;}
			res.json(dish);
	});
})
.post(function(req, res, next){
	console.log(req.body);
	Dishes.create(req.body, function(err, dish){
		if(err) throw err;

		console.log('Dish Created !');
		var id = dish._id;
		res.writeHead(200, {'Content-Type': 'text-plain'});
		res.end('Adder the dish with id '+ id);
	});

})
.delete(function(req, res, next){
	Dishes.remove({}, function(err, resp){
		if(err) throw err;
		res.json(resp);
	})
});

// SPECIFIC DISH
dishRouter.route('/:dishId')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type': 'text-plain'});
	next();
})
.get(function(req, res, next){
	res.end('You want info for the dish '+ req.params.dishId);
})
.put(function(req, res, next){
	res.end('you want to update '+ req.params.dishId + ' with ' + req.body.name + ' '+ req.body.name);
});


module.exports = dishRouter;
