var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// DISHES

app.all('/dishes', function(req, res, next){
	res.writeHead(200, {'Content-Type': 'text-plain'});

	next();
});

app.get('/dishes', function(req, res, next){
	res.end('Will send all the dishes to you');
});

app.post('/dishes', function(req, res, next){
	res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes', function(req, res, next){
	res.end('I will delete all dishes');
});

// SPECIFIC DISH 

app.get('/dishes/:dishId', function(req, res, next){
	res.end('You want info for the dish '+ req.params.dishId);
});

app.put('/dishes/:dishId', function(req, res, next){
	res.end('you want to update '+ req.params.dishId + ' with ' + req.body.name + ' '+ req.body.name);	
});


app.listen(port, hostname, function(){
	console.log('Listening in ' + hostname + ':' + port);
});