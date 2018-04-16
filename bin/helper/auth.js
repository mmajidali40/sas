let mongoose = require('mongoose');
let checkSession = function(req, res, next) {
    let loginId = req.cookies.get( "loginId");
    if(loginId == null) {
        console.log("cookie is not set");
        res.render('login', {message: null});
      } else {
        console.log("cookie is set");

        let User = mongoose.model('User');
        User.findOne({_id: mongoose.Types.ObjectId(loginId)})
            .populate('role')
            .populate('section')
            .then((user) => {
                if(user == null) {
                    return res.render('login',{message: null});
                }
                req.user = user;
                req.loginId = loginId;
                next();  
            })
            .catch( error => {
                return res.render('login',{message: null});
            });
    }
}

module.exports = checkSession;


