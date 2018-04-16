let mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
    userName: 'string',
    password: 'string',
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' }
 });
mongoose.model('User', schema);