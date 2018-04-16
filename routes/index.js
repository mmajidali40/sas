var express = require('express');
var router = express.Router();

let mongoose =  require('mongoose');

let checkSession = require('./../bin/helper/auth');

let designations = [];

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
  Staff.find({section: req.user.section})
    .then((data) => {
      res.render('ad-mark-attendance', {message: null, data});
    })
    .catch( error => {
      res.render('error', error);
    });
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
  // let Staff = mongoose.model('Staff');
  // let member = new Staff({
  //   name: req.body.name,
  //   fname: req.body.fname,
  //   cnic: req.body.name,
  //   createdAt: new Date(),
  //   designation: designationId,
  //   section: req.user.section

  // });
  // member.save();
  // res.render('ad-index', {message: 'Staff member successfully saved'});  

  res.send('yes');
  
});

module.exports = router;
