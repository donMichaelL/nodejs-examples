var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res){
	console.log('Request for '+ req.url + 'by method '+ req.method);
	
	if(req.method  == 'GET'){
		console.log('A GET request is comming....');
		var fileUrl;
		if(req.url == '/') fileUrl = '/index.html';
		else fileUrl = req.url;
		
		var filePath = path.resolve('./public' + fileUrl);
		var fileExt = path.extname(filePath);
		
		if (fileExt == '.html'){
			console.log('The request asked for an . html file');
			fs.exists(filePath, function(exists){
				if(!exists){
					res.writeHead(404, {'Content-Type':'text\html'});
					res.end();
					return;
				}
				res.writeHead(200, {'Content-Type': 'text\html'});
				fs.createReadStream(filePath).pipe(res);
			});
		}
		else{
			res.writeHead(404, {'Content-Type': 'text\html'});
		        res.end();
		}
	}else{
		res.writeHead(404, {'Content-Type': 'text\html'});
		res.end();
	}

	});

server.listen(port, hostname, function(){
	 console.log('Server is listening in %s:%s', hostname, port);
	});
