
var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');

router.post('/', function(req, res, next) {
  let User = mongoose.model('User');
  User.findOne({userName: req.body.userName, password: req.body.password})
    .populate('role')
    .populate('section')
    .then((user) => {
      if(user == null) {
        return res.render('login',{message: "username or password is incorrect"});
      }
      req.cookies.set( "loginId",user._id.toString(), {maxAge: 60 * 60 * 1000} );    
      if(user.role.name == "AD") {
        return res.render('ad-index', {message: null});
      }
      res.render('error', {message: 'you are not authorized', error: {}});  
    })
    .catch( error => {
      res.render('error', error);
    });
});

module.exports = router;
