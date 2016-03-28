var express = require('express');
var bodyParser = require('body-parser');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(function(req, res, next){
  res.writeHead(200, {'Content-type':'text-plain'});
  next();
})
.get(function(req, res){
  res.end('Return all leaders');
})
.post(function(req, res){
  res.end('Post new leader '+ req.body.name);
})
.delete(function(req, res){
  res.end('Delete evertyhin');
});


leaderRouter.route('/:leaderId')
.all(function(req, res, next){
  res.writeHead(200, {'Content-type': 'text-plain'});
  next();
})
.get(function(req, res){
  res.end('Get attributes for ' + req.params.leaderId);
})
.put(function(req, res){
  res.end('KSJdl' + req.body.name);
})
.delete(function(req, res){
  res.end('Delete leader with id ' + req.params.leaderId);
});


module.exports = leaderRouter;
