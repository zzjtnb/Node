const fs = require('fs')
/*---------- 1、fs.stat 检测是文件还是目录 ----------*/
// fs.stat('./html', (err, stats) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log(`${path}是文件:%s,${path}是目录:%s`, stats.isFile(), stats.isDirectory());//是文件:false,是目录:true
// });

// fs.stat('./README.md', (err, stats) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log(`${path}是文件:%s,${path}是目录:%s`, stats.isFile(), stats.isDirectory());//是文件:false,是目录:true
// });

/*---------- 2、fs.mkdir 创建目录 ----------*/
/**
 * path     要创建目录的路径
 * mode     目录权限(读写权限),默认777
 * calback  回调,传递异常参数err
 */

// fs.mkdir('./js', (err) => {
//   if (err) {
//     console.log(err);
//     console.log("创建失败");
//     return;
//   };
//   console.log("创建成功");
// });

/*---------- 3、fs.writeFile 创建写入文件 ----------*/

/*
 * filename    (String)             文件名称
 * data        (String | Buffer)    将要写入的内容，可以使字符串 或 buffer数据。
 * options     (Object)             option数组对象，包含：
 *  ·encoding  (string)             可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored。
 *  ·mode      (Number)             文件读写权限，默认值 438
 *  ·flag      (String)             默认值 ‘w'
 * callback    {Function}           回调，传递一个异常参数err。
*/

// fs.writeFile('/index.html', "<h1>Hello Node.js</h1>\n", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log("创建写入文件成功");
// });

// /*---------- 4、fs.appendFile 追加文件和内容(文件存在的话只会追加内容) ----------*/

// fs.appendFile('./html/index.html', "<h2>我是追加的内容1</h2>\n", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log("追加文件和内容 成功");
// })
// fs.appendFile('./html/index.html', "<h3>我是追加的内容2</h3>\n", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log("appendFile 成功");
// });

/*---------- 5、fs.readFile 读取文件 ----------*/

// fs.readFile('./html/index.html', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log(data);
//   console.log(data.toString());//把16进制的Buffer内容转换成String类型
// })

/*---------- 6、fs.readdir读取目录 ----------*/

// fs.readdir('./', (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(files);
// })

/*---------- 7、fs.rename 功能:1重命名 2.移动文件 ----------*/

// fs.rename('./js/insex1.js', './js/index.js', (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log('文件重命名成功');
// })

// fs.rename('./html/html.js', './js/index.js', (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log('文件移动成功');
// })

/*---------- 8、fs.rmdir 删除目录(只能删除空目录) ----------*/

// fs.rmdir('./css copy', (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log('目录删除成功');
// })

/*---------- 9、fs.unlink 删除文件 ----------*/

// fs.unlink('./css copy/index.css', (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log('文件删除成功');
// })

/*---------- 10、 fs.createReadStream 从文件流中读取数据 ----------*/
/* 如何以流的方式读取文件 */

// //创建一个读取流
// let readerStream = fs.createReadStream('./database/data.json')
// let count = 0;
// let str = '';
// //监听读取的状态
// readerStream.on('data', (data) => {
//   console.log('---开始接收---');
//   console.log(`接收到的长度是：${data.length}`);
//   str += data;
//   count++
// })
// //监听什么时候读取完
// readerStream.on('end', () => {
//   console.log('---结束接收---');
//   console.log(str.toString());
//   //cont等于几就表示读取操作进行了多少次
//   console.log(`读取操作进行了:${count}次`);
// })
// //监听错误信息
// readerStream.on('error', (error) => {
//   console.log(error)
// })

/*---------- 11、fs.createWriteStream 写入文件 ----------*/
/* 以流的方式写入文件 */
// let str = '';
// for (let i = 0; i < 500; i++) {
//   str += '我是从数据库获取的数据，我要保存起来\n'
// }
// // //创建写入流
// const writerStream = fs.createWriteStream('./database/output.txt');
// //使用utf 8 编码写入数据
// writerStream.write(str, 'UTF-8');
// //标记文件末尾,要监听写入完成的话需要在write之后写个end方法才会触发写入流里面的finish方法
// writerStream.end();
// //处理流事件-->finish事件
// writerStream.on('finish', () => {
//   /*finish-所有数据已被写入到底层系统时触发。*/
//   console.log("写入完成。");
// });
// console.log("程序执行完毕");

/*---------- 12、管道流(主要用于复制大文件) ----------*/
// // 创建一个可读流
// const readerStream = fs.createReadStream('./database/output.txt');
// // 创建一个可写流
// const writerStream = fs.createWriteStream('./database/input.txt');
// // 管道读写操作
// // 读取 output.txt 文件内容，并将内容写入到 input.txt 文件中
// readerStream.pipe(writerStream);
// console.log("程序执行完毕");

/*复制图片*/
// 创建一个可读流
const readerStream = fs.createReadStream('./upload/1.jpg');
// 创建一个可写流
const writerStream = fs.createWriteStream('./upload/images/1.jpg');
// 管道读写操作
// 读取 upload/1.jpg文件内容，并将内容写入到/upload/images/1.jpg文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕");