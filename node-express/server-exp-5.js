var express = require('express');
var morgan = require('morgan');

var dishRouter = require('./my_modules/dishRouter');
var promoRouter = require('./my_modules/promoRouter.js');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// Routing
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);

app.listen(port, hostname, function(){
	console.log('Listening in ' + hostname + ':' + port);
});
