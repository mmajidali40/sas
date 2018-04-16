let mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
    name: 'string'
 });
mongoose.model('Role', schema);