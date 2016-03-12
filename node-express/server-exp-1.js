var http = require('http');
var express = require('express');

var hostname = 'localhost';
var port = 3000;

// Express Code
var app = express();
app.use(function(req, res, next){
	console.log(req.headers);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('<html><body><h1>Hello World</h1></body></html>')
});

http.createServer(app).listen(port, hostname, function(){
	console.log('listening in ' + hostname +':'+ port);
})