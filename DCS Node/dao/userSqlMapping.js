/**
 * 数据库增删改查(CRUD)
 *  CRUD:增加(Create)、查询(Retrieve)、更新(Update)和删除(Delete)几个单词的首字母简写
 */
var user = {
  insert: 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
  update: 'update user set name=?, age=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  queryAll: 'select * from user'
};

module.exports = user;