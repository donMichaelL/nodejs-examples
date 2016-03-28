var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// DISHES
dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.find({})
		.populate('comments.postedBy') 
		.exec(function (err, dish) {
			if (err) { console.log('hello'); throw err;}
			res.json(dish);
		});
})
.post(Verify.verifyOrdinaryUser, function(req, res, next){
	console.log(req.body);
	Dishes.create(req.body, function(err, dish){
		if(err) throw err;

		console.log('Dish Created !');
		var id = dish._id;
		res.json(dish);
	});

})
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.remove({}, function(err, resp){
		if(err) throw err;
		res.json(resp);
	})
});

// SPECIFIC DISH
dishRouter.route('/:dishId')
.get(function(req, res, next){
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dish){
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
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dish){
			if(err) throw err;
			res.json(dish.comments);
		});
})
.post(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;

		req.body.postedBy = req.decoded._doc._id;

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

dishRouter.route('/:dishId/comments/:commentId')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Dish.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dish){
			res.json(dish.comments.id(req.params.commentId));
		});
})
.put(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){
		if(err) throw err;

		dish.comments.id(req.params.commentId).remove();

		req.body.postedBy = req.decoded._doc._id;
		dish.comments.push(req.body);

		dish.save(function(err, dish){
			if(err) throw err;

			res.json(dish);
		});
	});
})
.delete(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish){

		if(dish.comments.id(req.params.commentId).postedBy 
			!= req.decoded._doc._id){

			var err = new Error('You are not authenticated');
			err.status = 403;
			return next(err);
		}
		dish.comments.id(req.params.commentId).remove();

		dish.save(function(err, resp){
			if(err) throw err;
			res.json(resp);
		});
	});
});

module.exports = dishRouter;
