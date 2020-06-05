# 利用 HTTP 模块 Url 模块 Path 模块 Fs模块创建一个静态 WEB 服务器
## 目录
- 1 、Node.js 创建的第一个应用
- 2 、WEB服务器介绍
- 3 、Nodejs创建一个WEB服务器。

## **1** 、 **Node.js** 创建的第一个应用

**1** 、引入 **http** 模块

```JavaScript
var http=require("http");
```
**2** 、创建服务器

接下来我们使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 3000 端口。
函数通过 request,response 参数来接收和响应数据。

```JavaScript
const http = require('http'); //引入http模块
const path = require('path'); //引入path模块
const url = require('url'); //引入path模块
const fs = require('fs'); //引入fs模块
const common = require('./module/common')
const port = 3000
const host = "localhost"

http.createServer(function (req, res) {
  //http://localhost:3000/index.html
  //1.获取地址
  let pathname = url.parse(req.url).pathname;
  pathname = pathname == '/' ? '/index.html' : pathname
  // path.extname();//获取后缀名
  let extname = path.extname(pathname);
  let mime = common.getMime(extname)
  //2.通过fs模块读取文件
  if (pathname != "/favicon.ico") {//对请求地址进行过滤
    fs.readFile('./wwwroot' + pathname, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': mime }); //设置响应头和编码
        res.end('404这个页面不存在');//结束响应(这句话必须要写)
      };
      res.writeHead(200, { 'Content-Type': mime });
      res.write(data)
      res.end();
    })
  }
}).listen(port);

console.log(`Server running at http://${host}:${port}`);
```

## 2 、 WEB 服务器介绍

**Web** 服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，可以向
浏览器等Web客户端提供文档，也可以放置网站文件让全世界浏览，还可以放置数据文件，
让全世界下载。目前最主流的Web服务器有Apache、Nginx、 IIS等。

## **3** 、 **Nodejs** 创建一个 **WEB** 服务器。

- 1 、可以让我们访问web服务器上面的网站
- 2 、可以让我们下载web服务器上面的文件

