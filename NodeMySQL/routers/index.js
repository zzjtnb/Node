var express = require('express');
var Index = express.Router();

/* GET home page. */
Index.get('/', function (req, res, next) {
  // res.send('Hello World!')
  // res.render('../views/index.ejs', { title: 'Express' });
  res.render('index', { title: 'Express' });

});

module.exports = Index;
