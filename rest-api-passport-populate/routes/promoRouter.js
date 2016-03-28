var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());


promoRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type': 'text-plain'});

	next();
})
.get(function(req, res, next){
	res.end('You will get all Promotions objects');
})
.post(function(req, res, next){
	res.end('I will store ' + req.body.name);
})
.delete(function(req, res, next){
	res.end('I will delete everything');
});

promoRouter.route('/:promoId')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type':'text-plain'});

	next();
})
.get(function(req, res, next){
	res.end('I will return everything of the object');
})
.put(function(req, res, next){
	res.end(' i will update object '+ req.params.promoId+ ' with '+ req.body.name);
})
.delete(function(req, res, next){
	res.end('i will only delete '+ req.params.promoId);
});

module.exports = promoRouter;
