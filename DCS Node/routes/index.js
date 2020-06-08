var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.send('Hello World!')
  // res.render('../views/index.ejs', { title: 'Express' });
  res.render('index', { title: 'Express' });

});

module.exports = router;
