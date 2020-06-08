const express = require('express');
const home = express.Router();

/* GET home page. */
home.get('/', function (req, res, next) {
  // res.send('Hello World!')
  // res.render('../views/index.ejs', { title: 'Express' });
  res.render('index', { title: 'Express' });

});

module.exports = home;
