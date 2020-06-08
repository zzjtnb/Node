/**
 * 数据库增删改查(CRUD)
 *  CRUD:增加(Create)、查询(Retrieve)、更新(Update)和删除(Delete)几个单词的首字母简写
 */
const express = require('express');
const routet = express.Router();
const bcrypt = require('../util/bcryptjs')
const CRUD = {};

/**
 * 
 * @param {String} path -路由地址
 * @param {String} moduleName -模块名
 * @param {String} Query -查询参数
 */
function Create(path, moduleName, Query) {
  routet.post(`/${path}`, (req, res) => {
    const now = new Date();
    let userData = req.body
    userData.created = now
    //存之前先找
    console.log(1);
    moduleName.findOne({ where: { Query: req.body.Query } }).then(async (result) => {
      if (!result) {
        //加密密码
        userData.password = await bcrypt.getHash(req.body.password)
        moduleName.create(userData)
          .then((user) => {
            res.json({
              stats: 200, data: user.email + 'registered'
            })
          })
          .catch((err) => { res.send('error:' + err) });
      } else {
        res.json({
          stats: 0, data: "user already exists"
        })
      }
    }).catch((err) => {
      res.send('error:' + err)
    });
  });
}
CRUD.Create = Create

module.exports = CRUD;