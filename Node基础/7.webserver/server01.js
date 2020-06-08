const http = require('http'); //引入http模块
const url = require('url'); //引入url模块
const fs = require('fs'); //引入fs模块
const port = 3000
const host = "localhost"

http.createServer(function (req, res) {
  //http://localhost:3000/index.html
  //1.获取地址
  let pathname = req.url;
  console.log(pathname);
  pathname = pathname == '/' ? '/test.html' : pathname
  console.log(pathname);
  //2.通过fs模块读取文件
  if (pathname != "/favicon.ico") {//对请求地址进行过滤
    fs.readFile('./wwwroot' + pathname, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' }); //设置响应头和编码
        res.end('404这个页面不存在');//结束响应(这句话必须要写)
      };
      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.write(data)
      res.end();
    })
  }
}).listen(port);

console.log(`Server running at http://${host}:${port}`);