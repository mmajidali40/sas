let mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
    date: 'Date',
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
    createdAt: 'Date',
    record: 'Mixed'
 });
mongoose.model('Attendance', schema);