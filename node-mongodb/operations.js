var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback){
  var coll = db.collection(collection);

  coll.insert(document, function(err, result){
    assert.equal(err, null);
    console.log('Inserted');
    callback(result);
  });
};

exports.findDocuments = function(db, collection, callback){
  var coll = db.collection(collection);

  coll.find({}).toArray(function(err, result){
    assert.equal(err, null);
    callback(result);
  });
};

exports.removeDocument = function(db, document, collection, callback){
  var coll = db.collection(collection);

  coll.deleteOne(document, function(err, result){
    assert.equal(err, null);
    console.log('Deleted '+ document);
    callback(result);
  });
};

exports.updateDocument = function(db, document, update ,collection, callback){
  var coll = db.collection(collection);

  coll.updateOne(document, {$set: update}, null, function(err, result){
    assert.equal(null);
    console.log('Update '+ document);
    callback(result)
  })
}
