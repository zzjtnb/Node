/**
 * Node.js url模块
 */
const url = require('url'); //引入url模块
const api = "https://zzjtnb.com/blog/index?a='xxx'&b='xxx'"
//url.parse() 解析URl
// console.log(url.parse(api));
console.log(url.parse(api, true));