/**
 * 封装路由
 */
const fs = require('fs')
const path = require('path'); //引入path模块
const url = require('url'); //引入path模块
let charset = ';charset="utf-8"'

/**
 * 私有方法(不需要暴露)
 */
function getFileMime(extname) {

  let data = fs.readFileSync('./data/mime.json');//同步读取数据
  let mineObj = JSON.parse(data.toString())
  return mineObj[extname] + charset
}

exports.static = function (req, res, staticPath) {
  //1.获取地址
  let pathname = url.parse(req.url).pathname;
  pathname = pathname == '/' ? '/index.html' : pathname
  let extname = path.extname(pathname);  // path.extname();//获取后缀名
  //2.通过fs模块读取文件
  if (pathname != "/favicon.ico") {//对请求地址进行过滤
    try {
      let data = fs.readFileSync('./' + staticPath + pathname)
      if (data) {
        let mime = getFileMime(extname);
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
      };
    } catch (error) {
      // console.log(error);
    };
  };
};