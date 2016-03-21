var mongoose = require('mongoose');

var Dishes = require('./dishes');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error',  console.error.bind(console, 'connection error:'));

db.once('open', function(){

  Dishes.create({
    name: 'Name',
    image: '/new.jpg',
    price: '12.00',
    description: 'description',
    comments: [{
      rating: 1,
      comment: 'New comment',
      author: 'author'
    }]
  }, function(err, dish){
    if(err) throw err;

    console.log('Dish Created');
		console.log(dish.comments);

    var id = dish._id;

    setTimeout(function(){
			Dishes.findByIdAndUpdate(id, {$set:{description: 'Update Test'}}, {new:true})
			.exec(function(err, dish){
				if(err) throw err;
				console.log('Updated');

				// Push and then Save the dish
				dish.comments.push({
					rating: 5,
					comment: 'This is a new comment',
					author: 'Loukeris'
				});

        dish.save(function (err, dish) {
          console.log('Updated Comments!');
          console.log(dish.comments);
					db.collection('dishes').drop(function(){
						db.close();
					});
        });

			});
		}, 3000);

  });


});
