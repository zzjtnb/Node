/**
 * 对应3.module\common\2.request.js
 */
var request = require('./common/2.request')
// console.log(request);//{ xxx: { get: [Function: get], post: [Function: post] } } -- exports.xxx = obj--方式一
// console.log(request);//{ get: [Function: get], post: [Function: post] } -- module.exports = obj--方式二
// console.log(request);//{ get: [Function: get], post: [Function: post] } -- exports.get =function(){}--方式三

request.get();//从服务器获取数据
request.post();//向服务器提交数据


/**
 *总结: exports与module.exports的区别
 *  1.如果把所有的东西封装在了一个对象中建议使用module.exports进行暴露
 *  2.如果有好多方法就使用exports暴露
 *注意:
 *  1.使用exports时,只能单个设置属性
 *  2.使用module.exports可以单个设置属性,也可以整个导出
 */