var http = require('http');
var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);



var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

//session use
app.use(session({
	name: 'session-id',
	secret: '12345-67890-09876-54321',
	saveUninitialized: true,
	resave: true,
	store: new FileStore()
}));

//basic authentication code 
//with session
function auth(req, res, next){
	// console.log(req.headers);
	
	if(!req.session.user) {
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
			req.session.user = 'admin';
			next();
		} else{
			var err = new Error('You are not authenticated');
			err.status = 401;
			next(err);
			}
	} else{
		if(req.session.user == 'admin'){
			console.log('Hello' + req.session);
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