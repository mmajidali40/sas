var express = require('express');
var router = express.Router();

let mongoose =  require('mongoose');

let checkSession = require('./../bin/helper/auth');

let designations = [];
let staff = [];

router.get('/', checkSession, function(req, res, next) {
  if(req.user.role.name == "AD") {
    return res.render('ad-index', {message: null});  
  }
  res.render('login', {message: null});  
});

router.get('/add-staff', checkSession, function(req, res, next) {
  if(designations.length == 0) {
    let Designation = mongoose.model('Designation');
    Designation.find({})
      .then((desigs) => {
        designations = desigs;
        res.render('add-staff', {message: null, data: desigs});
      })
      .catch( error => {
          return res.render('login',{message: null, data: []});
      });
  } else {
    res.render('add-staff', {message: null, data: designations});
  }
});

router.get('/mark-attendance', checkSession, function(req, res, next) {
  let Staff = mongoose.model('Staff');
  Staff.find({section: req.user.section, status: {$ne: 'INACTIVE'}})
    .then((data) => {
      staff = data;
      res.render('ad-mark-attendance', {message: null, data});
    })
    .catch( error => {
      res.render('error', error);
    });
});

router.get('/relief-staff', checkSession, function(req, res, next) {
  let Staff = mongoose.model('Staff');
  Staff.find({section: req.user.section, status: {$ne: 'INACTIVE'}})
    .then((data) => {
      res.render('ad-relief-staff', {message: null, data});
    })
    .catch( error => {
      res.render('error', error);
    });
});

router.get('/search-attendance', checkSession, function(req, res, next) {
  res.render('ad-search-staff',{message: null, data: []});
});



router.post('/submit-search-attendance', checkSession, async function(req, res, next) {
  try {
    // if(req.body.name == "" || req.body.name == null) {
    //   return res.render('search-attendance', {message: "name is required", data: []});
    // }
      
    let Attendance = mongoose.model('Attendance');
    let data = await Attendance.findOne({date: new Date(req.body.date)});
    res.render('ad-search-staff',{message: null, data: data.record});
  } catch (error) {
    res.render('error',error);
  }
});  

router.post('/submit-staff', checkSession, function(req, res, next) {
  if(req.body.name == "" || req.body.name == null) {
    return res.render('add-staff', {message: "name is required", data: designations});
  }
  if(req.body.fname == "" || req.body.fname == null) {
    return res.render('add-staff', {message: "father/husband name is required", data: designations});
  }
  if(req.body.cnic == "" || req.body.cnic == null) {
    return res.render('add-staff', {message: "cnic is required", data: designations});
  }
  if(req.body.desig == "" || req.body.desig == null) {
    return res.render('add-staff', {message: "designation is required", data: designations});
  }
  if(req.body.phone == "" || req.body.phone == null) {
    return res.render('add-staff', {message: "designation is required", data: designations});
  }

  let cnic = req.body.cnic;
  cnic = cnic.replace(/-/g, "");
  if(Number.isNaN(cnic*1) || cnic.length != 13) {
    return res.render('add-staff', {message: "cnic is not valid"});
  }

  let designationId = null;
  designations.forEach( desg => {
    if(req.body.desig == desg.code) {
      designationId = desg._id;
    }
  });
  let Staff = mongoose.model('Staff');
  let member = new Staff({
    name: req.body.name,
    fname: req.body.fname,
    cnic: req.body.name,
    phone: req.body.phone,
    address: req.body.address != null ? req.body.address : "",
    createdAt: new Date(),
    designation: designationId,
    section: req.user.section

  });
  member.save();
  res.render('ad-index', {message: 'Staff member successfully saved'});  
});

router.post('/submit-attendance', checkSession, function(req, res, next) {
  if(req.body.date == "")  
    return res.render('ad-mark-attendance', {message: 'Please select the date', data: staff});  
  
  let records =[];
  let keys = Object.keys(req.body);
  for(let i=1; i<keys.length; i++) {
    let obj = {
      staffId: keys[i],
      timeIn: req.body[keys[i]][0],
      timeOut: req.body[keys[i]][1],
      IsPresent: req.body[keys[i]].length == 3 ? "absent" : "present",
      remarks: req.body[keys[i]].length == 3 ? req.body[keys[i]][2] : req.body[keys[i]][3]
    }
    staff.forEach( e => {
      if(e._id.toString() == obj.staffId) {
        obj.name = e.name;
        obj.fname = e.fname;
      }
    });
    records.push(obj);
  }

  let Attendance = mongoose.model('Attendance');
  let member = new Attendance({
    date: new Date(req.body.date),
    section: req.user.section,
    createdAt: new Date(),
    record: records
  });
  member.save();
  res.render('ad-index', {message: 'Attendance is successfully saved'});    
});

router.post('/submit-relief-staff', checkSession, async function(req, res, next) {
  try {
    let staffIds = Object.keys(req.body);
    let Staff = mongoose.model('Staff');
    let data;
    if(staffIds.length > 0) {
      data = await Staff.updateMany({_id: {$in: staffIds}}, {status: 'INACTIVE'});
      res.render('ad-index', {message: 'Staff successfully released'});
    } else {
      data = await Staff.find({section: req.user.section, status: {$ne: 'INACTIVE'}})
      res.render('ad-relief-staff', {message: "please select at least one member", data});
    }
  } catch(error) {
    res.render('error', error);
  }
}); 



module.exports = router;
