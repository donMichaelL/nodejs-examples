var rect = require('./rectangle-2');

function solveRect(l, b){
	console.log("Solving for rectangle with l = "+ l + " and b = " + b);
	
	rect(l, b, function(err, calc){
		if(err)
			console.log(err);
		else {
			console.log(calc.area() + " " + calc.perimeter());
		}
	
	});
}

solveRect(2,4);
solveRect(3,5);
solveRect(-3,5);
