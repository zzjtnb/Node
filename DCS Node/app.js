const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./api/users');

const app = express();
const host = "localhost";
const port = process.env.PORT || 3000;
/**
 * 使用EJS模板
 */
// app.set('views', path.join(__dirname, 'views'));//设定网页存放的目录.__dirname:返回当前文件所在的绝对路径
// app.set('view engine', 'ejs');//指定模板文件的后缀名为ejs

/**
 * 使用HTML模板
 */
app.set('view engine', 'html');//指定模板文件的后缀名为html
// app.engine('html', require('ejs').__express);//将EJS模板映射至".html"文件
app.engine('html', ejs.renderFile);//将EJS模板映射至".html"文件


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/**
 * 设定静态文件目录，比如本地文件.
 * 目录为demo/public/images，访问.
 * 网址则显示为http://localhost:3000/images.
 */
app.use(express.static(path.join(__dirname, 'public')));

// 输出日志到目录
const mkdir = require('./util/mkdir')
mkdir.mkdir('log')
var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', { flags: 'a', encoding: 'utf8' }); // 记得要先把目录建好，不然会报错
app.use(logger('combined', { stream: accessLogStream }));

// 使用路由
app.use('/', routes);
app.use('/users', users);


app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
})

function receiveDCSData(dcsData) {
  // console.log(dcsData);
  // let geoJSONData = toGeoJSON(dcsData);
  // for (let connection in wsConnections)
  //   wsConnections[connection].sendText(JSON.stringify(geoJSONData));
}
const dcsData = require('./server/dcsdataretriever.js');
dcsData(receiveDCSData);
// const net = require('./server/net')
// net()