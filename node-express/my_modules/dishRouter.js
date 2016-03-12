var express = require('express');
var bodyParser = require('body-parser');


var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// DISHES

dishRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type': 'text-plain'});
	next();
})
.get(function(req, res, next){
	res.end('Will send all the dishes to you');		
})
.post(function(req, res, next){
	res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(function(req, res, next){
	res.end('I will delete all dishes');
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


exports.dishRouter = dishRouter;