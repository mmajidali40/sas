var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sas');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('database connected');
});
require('./../models/user');
require('./../models/staff');
require('./../models/role');
require('./../models/section');
require('./../models/designation');
require('./../models/attendance');
require('./../models/work');
