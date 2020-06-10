const express = require('express');
//1.创建一个路由容器
const router = express.Router();

//2.把路由都挂载到 router 路由容器
router.get('/login', (req, res) => {
  // res.render('../views/user/login.ejs');
  res.render('user/login', { title: 'Login' });
});
router.get('/register', (req, res, next) => {
  res.render('../views/user/register.html');
});

module.exports = router;
