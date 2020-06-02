/*
 var obj = {
  get: function () {
    console.log("从服务器获取数据");
  },
  post: function () {
    console.log("向服务器提交数据");
  },
}
// //方式一
// exports.xxx = obj;
// //方式二
module.exports = obj;
*/

//方式三
exports.get = function () {
  console.log("从服务器获取数据");
};
exports.post = function () {
  console.log("向服务器提交数据");
};