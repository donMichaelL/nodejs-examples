var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url ="mongodb://localhost:27017/crunchbase";

MongoClient.connect(url, function(err, db){
  assert.equal(err, null);
  console.log('Connected to Database');

  var cursor = db.collection('companies').find({});

  cursor.forEach(function(company){
    console.log(company.name);
  }, function(err){
    assert.equal(err, null);
    return db.close();
  })
  
});

//"category_code": "biotech"
