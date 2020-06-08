/**
 * user 登录注册接口
 */
const express = require('express');
const user = express.Router();
const bcrypt = require('../util/bcryptjs');
const jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'secret';//定义到环境变量
const userModule = require('../modules/users');
//http://localhost:3000/api/v1/test
user.get('/test', (req, res) => {
  res.send({ msg: "测试接口" });
});
user.post('/login', (req, res) => {
  //得到数据去表里查
  userModule.findOne({ where: { email: req.body.email } }).then(async (result) => {
    // 查到数据
    if (result) {
      //密码匹配
      if (await bcrypt.compare(req.body.password, result.password)) {
        //生成token
        let token = jwt.sign(result.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 })
        //https://jwt.io    解析token
        res.status(200).json(token)
        // res.status(200).json({ data: '登陆成功' });
      } else {
        res.status(400).json({ error: "password is incorrect" })
      }
    } else {
      res.status(400).json({ error: "user dose not exist" })
    }
  }).catch((err) => {
    console.log(err);
    res.status(400).json({ error: err })
  });
})
user.post('/register', (req, res) => {
  const now = new Date();
  let userData = req.body
  userData.created = now
  userData.created1 = now
  // 存之前先找
  userModule.findOne({ where: { email: req.body.email } }).then(async (result) => {
    if (!result) {
      //加密密码
      userData.password = await bcrypt.hash(req.body.password)
      userModule.create(userData)
        .then((result) => {
          res.status(200).json({ data: result.email + ' registered' });
        })
        .catch((err) => {
          // res.send('error:' + err)
          res.status(400).json({ error: err })
        });
    } else {
      res.status(400).json({ data: "user already exists" })
    }
  }).catch((err) => {
    res.status(400).json({ error: '注册失败,请检查数据是否完整' })
  });
});

module.exports = user;