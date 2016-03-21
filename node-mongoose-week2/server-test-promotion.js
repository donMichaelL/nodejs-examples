var mongoose = require('mongoose');

var Promotions = require('./promotions');

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  Promotions.create({
    name: 'promotion',
    image: 'new',
    price: '13.4',
    description: 'New Promotion'
  }, function(err, promotion){
    if(err) throw err

    console.log('Dish Created');
    console.log(promotion);
    var id = promotion._id;

    setTimeout(function(){
			Promotions.findByIdAndUpdate(id, {$set:{description: 'Update Test'}}, {new:true})
			.exec(function(err, promotion){
				if(err) throw err;
				console.log('Updated');
        console.log(promotion.description);


				db.collection('dishes').drop(function(){
					db.close();
				});


			});
		}, 3000);

  });
});
