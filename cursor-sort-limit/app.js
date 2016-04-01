var MongoClient = require('mongodb').MongoClient;
var assert =require('assert');
var commandLineArgs = require('command-line-args');

var options = commandLineOptions();
var url = "mongodb://localhost:27017/crunchbase";

MongoClient.connect(url, function(err, db){
  assert.equal(err, null);
  var totalNumber = 0;

  var query = queryDocuments(options);
  var cursor = db.collection('companies').find(query, {'_id':0, 'name':1});

  cursor.project({_id:0, 'name':1, 'founded_year':1});


  cursor.skip(options.skip);

  cursor.limit(options.limit);

  cursor.sort([["founded_year", -1]]);


  cursor.forEach(function(company){
    totalNumber ++;
    console.log(company);
  }, function(err){
    assert.equal(err, null);
    // console.log('end');
    // console.log(query);

    console.log(totalNumber);
    db.close();
  });



});

//*********** READ + WHERE CLAUSE
function queryDocuments(options){
  var query = {
    'founded_year': {
      '$gte': options.firstYear,
      '$lte': options.lastYear
    }
  };

  if('employees' in options){
    query.number_of_employees = { "$gte": options.employees };
  }

  if('ipo' in options){
    if(options.ipo == 'yes'){
      query['ipo.valuation_amount'] = {'$exists': true, '$ne': null};
    }else if(options.ipo == 'no'){
      query['ipo.valuation_amoun'] = null;
    }
  }

  if('country' in options){
    query['offices.country_code'] = options.country;
  }

  return query;
}



function commandLineOptions(){
  var cli = commandLineArgs([
    { name: 'firstYear', alias: 'f', type: Number },
    { name: 'lastYear', alias: 'l', type: Number },
    { name: 'employees', alias: 'e', type: Number },
    {name: 'ipo', alias: 'i', type: String},
    {name: 'country', alias: 'c', type: String},
    { name: 'skip', type: Number },
    { name: 'limit', type: Number },
  ]);

  var options = cli.parse();
  return options;
}
