var http = require('http');
var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

//basic authentication code

function auth(req, res, next){
	console.log(req.headers);
	
	var authHeader = req.headers.authorization;
	if(!authHeader) {
		var err = new Error('You are not authenticated');
		err.status = 401;
		next(err);
		return;
	}
	var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	if(user == 'admin' && pass == 'password'){
		next();
	} else{
		var err = new Error('You are not authenticated');
		err.status = 401;
		next(err);
		}
}

app.use(auth);
//
app.use(express.static(__dirname + '/public'));


// app.use error case
app.use(function(err, req, res, next){
	res.writeHeader(err.status || 500, {
		'www-authenticate': 'Basic',
		'Content-type': 'text-plain'
	});
	res.end(err.message);
});

app.listen(3000, hostname, function(){
	console.log('Starting server in ' + hostname + ':' + port);
})