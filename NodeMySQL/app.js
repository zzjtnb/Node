const express = require('express');
const app = express()
const host = 'localhost'
const port = process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const ejs = require('ejs');
// app.set('views', path.join(__dirname, 'views'));//设定网页存放的目录.__dirname:返回当前文件所在的绝对路径
// app.set('view engine', 'ejs');//指定模板文件的后缀名为ejs

app.set('view engine', 'html');//指定模板文件的后缀名为html
// app.engine('html', require('ejs').__express);//将EJS模板映射至".html"文件
app.engine('html', ejs.renderFile);//将EJS模板映射至".html"文件

/**
 * 设定静态文件目录，比如本地文件.
 * 目录为demo/public/images，访问.
 * 网址则显示为http://localhost:3000/images.
 */
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

//路由
const route = require('./routers/index')
app.use(route);//把路由容器挂载到 app 服务中
//Api
const user = require('./api/user')
app.use('/api/v1', user)
// console.log('\033[42;30m DONE \033[40;32m Compiled successfully in 19987ms\033[0m')
app.listen(port, () => console.log('\033[42;30m DONE \033[40;32m  app runing on http://%s:%s \033[0m', host, port))