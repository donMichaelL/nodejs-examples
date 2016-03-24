var http = require('http');
var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');


var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(cookieParser('12345-67890-09876-54321'));	//secret key

//basic authentication code 
//with signed Cookie
function auth(req, res, next){
	// console.log(req.headers);
	
	if(!req.signedCookies.user) {
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
			res.cookie('user', 'admin', {signed: true});
			next();
		} else{
			var err = new Error('You are not authenticated');
			err.status = 401;
			next(err);
			}
	} else{
		if(req.signedCookies.user == 'admin'){
			console.log(req.signedCookies);
			next();
		} else{
			var err = new Error('You are not authenticated');
			err.status = 401;
			next(err);
		}
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