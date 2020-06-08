// require('./http/http')
// require('./url/url2')

/**
 * Node.js http模块
 */

const http = require('http'); //引入http模块
const url = require('url'); //引入url模块
const host = "localhost";
const port = 3000;

/**
 * request-获取客户端传过来的信息
 * response-返回给请求者的信息
 */
http.createServer(function (request, response) {
  // const api = "http://localhost:3000/?name=zhangsan&age=20"
  // console.log(request.url); //获取请求的url
  if (request.url !== "/favicon.ico") {
    var userInfo = url.parse(request.url, true).query
    // console.log(`姓名:${userInfo.name},年龄:${userInfo.age}`);
    console.log("姓名: %s, 年龄: %s", userInfo.name, userInfo.age);
  }
  response.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' }); //设置响应头和编码
  response.write('<head><meta charset="UTF-8"></head>') //解决浏览器乱码
  response.write('this is node js')
  response.end();//结束响应(这句话必须要写)
}).listen(port);

console.log(`Server running at http://${host}:${port}`);