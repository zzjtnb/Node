const express = require('express');
const app = express()
const host = 'localhost'
const port = process.env.PORT || 3000
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('views', path.join(__dirname, 'views'));//设定网页存放的目录.__dirname:返回当前文件所在的绝对路径
app.set('view engine', 'ejs');//指定模板文件的后缀名为ejs

// const ejs = require('ejs');
// app.set('view engine', 'html');//指定模板文件的后缀名为html
// // app.engine('html', require('ejs').__express);//将EJS模板映射至".html"文件
// app.engine('html', ejs.renderFile);//将EJS模板映射至".html"文件

//静态资源中间件-设定静态文件目录.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  next();
});
//路由
const route = require('./routers/index')
app.use(route);//把路由容器挂载到 app 服务中
//处理路径不存在
app.use((req, res) => {
  res.render('index', { title: '首页' });
})
//注意：上面代码一定要放在所有路由中间件之后，原理就是当前面没有任何一个路由可以处理的时候，程序就会走到最后这个中间件，然后就可以当作 404 来处理了。

//Api
const user = require('./api/user')
app.use('/api/v1', user)
// console.log('\033[42;30m DONE \033[40;32m Compiled successfully in 19987ms\033[0m')
app.listen(port, () => console.log('\033[42;30m DONE \033[40;32m  app runing on http://%s:%s \033[0m', host, port))