let mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
    name: 'string',
    fname: 'string',
    cnic: 'string',
    phone: 'string',
    address: 'string',
    status: 'string',
    createdAt: 'Date',
    designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation' },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' }
});
mongoose.model('Staff', schema);