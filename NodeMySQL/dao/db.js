/**
 * 连接到数据库
 */
const Sequelize = require('sequelize');
const dbcfg = require('../config/db')
// 分别传递参数 (其它数据库)
// const sequelize = new Sequelize(dbcfg.test1.database, dbcfg.test1.username, dbcfg.test1.password, dbcfg.test1.options);
const sequelize = new Sequelize(dbcfg.test2);
//测试连接
sequelize.authenticate()
  .then(() => {
    console.log('MySql Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {}
db.sequelize = sequelize
module.exports = db