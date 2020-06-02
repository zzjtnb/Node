/**
 * Node.js module --对应3.module\common\1.tools.js
 */

const http = require('http'); //引入http模块
const tools = require('./common/1.tools'); //引入tools模块
// console.log(tools);//{ formatApi: [Function: formatApi] }
const host = "localhost";
const port = 3000;

/**
 * request-获取客户端传过来的信息
 * response-返回给请求者的信息
 */
http.createServer(function (request, response) {

  response.writeHead(200, { 'Content-Type': 'text/html;charset="untf-8"' }); //设置响应头和编码
  response.write('<head><meta charset="UTF-8"></head>') //解决浏览器乱码
  response.write('Hello Node.js')
  response.write('<br>')
  /* ------------------------------------- */
  var api = tools.formatApi('?name=zhangsan&age=20')
  response.write(api)
  /* ------------------------------------- */
  response.end();//结束响应(这句话必须要写)
}).listen(port);

console.log(`Server running at http://${host}:${port}`);