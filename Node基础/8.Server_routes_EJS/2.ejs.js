/**
 * EJS模板引擎
 */
const http = require('http'); //引入http模块
const url = require('url'); //引入path模块
const ejs = require('ejs')//引入ejs
const routes = require('./module/routes')
const port = 3000
const host = "localhost"
http.createServer((req, res) => {
  //创建静态Web服务
  routes.static(req, res, 'wwwroot')
  //路由
  let pathname = url.parse(req.url).pathname;
  //http://localhost:3000/news?page=2&id=1
  if (pathname == '/news') {
    let message = "数据库里面获取的数据";
    let list = [
      { title: '新闻111' },
      { title: '新闻222' },
      { title: '新闻333' },
    ]
    ejs.renderFile('./views/news.ejs', { msg: message, list: list }, (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.end(data);
    });
  } else if (pathname == '/login') {
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end('执行登录')
  } else if (pathname == '/register') {
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end('执行注册')
  } else if (pathname == '/admin') {
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end('处理后端业务逻辑')
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end('页面不存在')
  }

}).listen(port);

console.log(`Server running at http://${host}:${port}`);