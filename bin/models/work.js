let mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
    date: 'Date',
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    rec_app_pass: 'string',
    sort_scrutiny: 'string',
    track_app_pass: 'string',
    entry_edit: 'string',
 });
mongoose.model('Work', schema);