let a = 1;
let b = 2;
let c = "老王"

exports.b = b
//Object {b: 2}
module.exports.c = c
// Object { b: 2, c: "老王" }
/**
 * 系统默认设置了:exports =module.exports
 */
exports = {
  "user": "张三"
}
//Object {b: 2, c: "老王"}
module.exports = {
  "user": "李四"
}
//Object {user: "李四"}
/**
 * 注意:使用exports时,只能单个设置属性
 *      使用module.exports可以单个设置属性,也可以整个导出
 */
console.log(a);
module.exports = a