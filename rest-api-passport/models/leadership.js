var mongoose = require('mongoose');

var leadershipSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  abbr: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
},{timestamps: true});


var Leaders = mongoose.model('Leader', leadershipSchema);

module.exports = Leaders;
