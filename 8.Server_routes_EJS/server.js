/**
 * GET、POST
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
  // 获取请求类型
  if (pathname == '/news') {
    //获取 GET 传值  true-把String变成对象
    let query = url.parse(req.url, true).query
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    // res.end(query);//throw new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
    res.end("get传值获取成功");
    console.log(query.page);//
    console.log(req.method);//GET
  } else if (pathname == '/login') {
    //POST 演示
    ejs.renderFile('./views/form.ejs', {}, (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
      res.end(data);
    });
  } else if (pathname == '/doLogin') {
    console.log(req.method);//POST
    //获取POST传值
    let postData = ''
    //数据块接收中
    req.on('data', (chunk) => {
      postData += chunk
    })
    //数据接收完毕，执行回调函数
    req.on('end', (chunk) => {
      try {
        console.log(postData);
        res.end(postData)
      } catch (error) {
        // req.query = postData;
        // console.log(querystring.parse(postData));
      }
    })
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