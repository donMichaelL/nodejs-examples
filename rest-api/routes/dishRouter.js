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
.get(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		res.json(dish);
	});
})
.put(function(req, res, next){
	Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new: true}, function(err, dish){
		if(err) throw err;
		res.json(dish);
	});
})
.delete(function(req, res, next){
	Dishes.remove(req.params.dishId, function(err, resp){
		if(err) throw err;
		res.json(resp);
	})
});

// COMMENTS
dishRouter.route('/:dishId/comments')
.get(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		res.json(dish.comments);
	});
})
.post(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		dish.comments.push(req.body);
		dish.save(function(err, dish){
			if(err) throw err;
			res.json(dish);
		});
	});
})
.delete(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;
		console.log(dish);
		for (var i = (dish.comments.length - 1); i >= 0; i--) {
			dish.comments.id(dish.comments[i]._id).remove();
		}
		dish.save(function(err, dish){
			if(err) throw err;
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Deleted all comments!');
		});
	});
});


module.exports = dishRouter;
