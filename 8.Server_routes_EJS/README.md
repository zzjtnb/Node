# NodeJs 封装静态 WEB 服务、 路由、EJS 模板引擎、 GET 、 POST
## 目录

- 1 、Nodejs 静态文件托管
- 2 、路由
- 3 、初识EJS模块引擎
- 4 、Get、Post

## **1** 、 **Nodejs** 封装静态 **web** 服务

### server.js

```JavaScript
const http = require('http'); //引入http模块
const url = require('url'); //引入path模块
const routes = require('./module/routes')
const port = 3000
const host = "localhost"
http.createServer((req, res) => {
  //一句话创建web服务
  routes.static(req, res, 'wwwroot')
  //创建路由
  let pathname = url.parse(req.url).pathname;
  if (pathname == '/login') {
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
```

#### ./module/routes.js

```JavaScript
/**
 * 封装静态 WEB 服务
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
```

## 2 、 路由

>官方解释：
路由（Routing）是由一个URI（或者叫路径）和一个特定的HTTP方法（GET、POST等）组成
的，涉及到应用如何响应客户端对某个网站节点的访问。

>通俗的说：
路由指的就是针对不同请求的URL，处理不同的业务逻辑。



## 3 、 初识 EJS 模块引擎

我们学的EJS是后台模板，可以把我们数据库和文件读取的数据显示到Html页面上面。它
是一个第三方模块，需要通过npm安装
https://www.npmjs.com/package/ejs

### 安装：

```
npm install ejs –-save / cnpm install ejs --save
```
**Nodejs** 中使用：

```JavaScript
ejs.renderFile(filename, data, options, function(err, str){
// str => Rendered HTML string
});
```

### EJS 常用标签

- <%%>流程控制标签

- <%=%>输出标签（原文输出HTML标签）

- <%-%>输出标签（HTML会被浏览器解析）


```html
<a href="<%= url %>"><img src="<%= imageURL %>" alt=""></a><ul>
```

```html
<ul>
<% for(var i = 0 ; i < news.length ; i++){ %>
  <li><%= news[i] %></li>
<% } %>
</ul>
```
## **4** 、 **Get** 、 **Post**

 >超文本传输协议（HTTP）的设计目的是保证客户端机器与服务器之间的通信。

 >在客户端和服务器之间进行请求-响应时，两种最常被用到的方法是：**GET**和 **POST**。

- **GET** - 从指定的资源请求数据。（一般用于获取数据）

-  **POST** - 向指定的资源提交要被处理的数据。（一般用于提交数据）

### 获取 GET 传值：

```JavaScript
const url = require('url');
const port = 3000
const host = "localhost"
http.createServer((req, res) => {
   // 获取请求类型
  console.log(req.method);//GET
  //获取 GET 传值  true-把String变成对象
  var urlinfo=url.parse(req.url,true);
  console.log(urlinfo.query;)
  res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
  res.end()
}).listen(port);
console.log(`Server running at http://${host}:${port}`);
```

### 获取 **POST** 传值：

```JavaScript
var postData='';
//数据块接收中
req.on('data',function(postDataChunk){
postData+=postDataChunk;
});
//数据接收完毕，执行回调函数
req.on('end',function(){
try{
postData=JSON.parse(postData);
}catch(e){}
req.query=postData;
console.log(querystring.parse(postData));
});
```


# 完整代码
```JavaScript
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
```
