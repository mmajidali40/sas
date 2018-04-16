let mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
    name: 'string',
    code: 'string'
 });
mongoose.model('Section', schema);