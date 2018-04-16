var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.cookies.get("name"));
  res.send(req.body.name);
});

module.exports = router;
