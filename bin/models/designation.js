let mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
    code: 'string'
 });
mongoose.model('Designation', schema);