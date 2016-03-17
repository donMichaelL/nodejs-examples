var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

var dboper = require('./operations');

var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db){
  assert.equal(null, err);
  console.log('Connect with server');

  dboper.insertDocument(db, {name: 'Cuta2', description: 'Test' }, 'dishes', function(result){
    console.log('-->' + result.ops);
    dboper.findDocuments(db, 'dishes', function(result){
      console.log('-->' + result);
      dboper.updateDocument(db, {name: 'Cuta2'}, {description: 'Updated'}, 'dishes', function(result){
        console.log('-->' + result);
        dboper.findDocuments(db, 'dishes', function(result){
            console.log('-->' + result);
            db.dropCollection('dishes', function(result){
              console.log('-->' + result);
              db.close();
            })
        });
      });
    });
  });
});
