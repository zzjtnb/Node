/**
 * Node.js http模块
 */

const http = require('http'); //引入http模块
const port = 3000
const host = "localhost"

/**
 * request-获取客户端传过来的信息
 * response-返回给请求者的信息
 */
http.createServer(function (request, response) {
  console.log(request.url); //获取请求的url
  response.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' }); //设置响应头和编码
  response.write('<head><meta charset="UTF-8"></head>') //解决浏览器乱码
  response.write('this is node js')
  response.end();//结束响应(这句话必须要写)
}).listen(port);

console.log(`Server running at http://${host}:${port}`);