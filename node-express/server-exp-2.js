var http = require('http');
var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));


app.listen(3000, hostname, function(){
	console.log('Starting server in ' + hostname + ':' + port);
})