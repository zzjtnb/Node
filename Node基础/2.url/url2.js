/**
 * Node.js url模块的使用
 */

const url = require('url'); //引入url模块
const api = "https://zzjtnb.com/blog/index?a='xxx'&b='xxx'"
var getValue = url.parse(api, true).query
// console.log(getValue);
console.log(`a:${getValue.a},b:${getValue.b}`);