# 目录

- 1、fs.stat 检测是文件还是目录
- 2、fs.mkdir 创建目录
- 3、fs.writeFile 创建写入文件
- 4、fs.appendFile 追加文件和内容(文件存在的话只会追加内容)
- 5、fs.readFile 读取文件
- 6、fs.readdir读取目录
- 7、fs.rename 功能:1重命名 2.移动文件
- 8、fs.rmdir 删除目录(只能删除空目录)
- 9、fs.unlink删除文件
- 10、fs.createReadStream从文件流中读取数据
- 11、fs.createWriteStream 写入文件
- 12、管道流(主要用于复制大文件)

## 1、fs.stat 检测是文件还是目录

```JavaScript
const fs=require('fs')
fs.stat('./html', (err, stats) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log(`${path}是文件:%s,${path}是目录:%s`, stats.isFile(), stats.isDirectory());//是文件:false,是目录:true
});

fs.stat('./README.md', (err, stats) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log(`${path}是文件:%s,${path}是目录:%s`, stats.isFile(), stats.isDirectory());//是文件:false,是目录:true
});
```

## 2、fs.mkdir 创建目录

```JavaScript
const fs=require('fs')
/**
 * path     要创建目录的路径
 * mode     目录权限(读写权限),默认777
 * calback  回调,传递异常参数err
 */
fs.mkdir('./Js', (err) => {
  if (err) {
    console.log(err);
    console.log("创建失败");
    return;
  };
  console.log("创建成功");
});
```
## 3、fs.writeFile 创建写入文件

```JavaScript
const fs=require('fs')
/*
 * filename    (String)             文件名称
 * data        (String | Buffer)    将要写入的内容，可以使字符串 或 buffer数据。
 * options     (Object)             option数组对象，包含：
 *  ·encoding  (string)             可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored。
 *  ·mode      (Number)             文件读写权限，默认值 438
 *  ·flag      (String)             默认值 ‘w'
 * callback    {Function}           回调，传递一个异常参数err。
*/

fs.writeFile('./html/index.html', "<h1>Hello Node.js</h1>\n", (err) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log("创建写入文件成功");
});

```
## 4、fs.appendFile 追加文件和内容(文件存在的话只会追加内容)

```JavaScript
const fs=require('fs')
fs.appendFile('./html/index.html', "<h2>我是追加的内容1</h2>\n", (err) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log("追加文件和内容 成功");
})
fs.appendFile('./html/index.html', "<h3>我是追加的内容2</h3>\n", (err) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log("appendFile 成功");
});
```

## 5、fs.readFile 读取文件

```JavaScript
const fs=require('fs')
fs.readFile('./html/index.html', (err, data) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log(data);
  console.log(data.toString());//把16进制的Buffer内容转换成String类型
})
```
## 6、fs.readdir 读取目录

```JavaScript
const fs=require('fs')

fs.readdir('./', (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(files);
})
```
## 7、fs.rename 重命名

```JavaScript
const fs=require('fs')
fs.rename('./Js/insex1.js', './Js/index.js', (err) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log('文件重命名成功');
})

fs.rename('./Js/index.js', './html/html.js', (err) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log('文件移动成功');
})

fs.rename('./html/html.js', './Js/index.js', (err) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log('文件移动成功');
})
```

## 8、fs.rmdir 删除目录(只能删除空目录)

```JavaScript
const fs=require('fs')
fs.rmdir('./css copy', (err) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log('目录删除成功');
})
```
## 9、fs.unlink 删除文件

```JavaScript
const fs=require('fs')
fs.unlink('./css copy/index.css', (err) => {
  if (err) {
    console.log(err);
    return;
  };
  console.log('文件删除成功');
})
```
## 10. fs.createReadStream 从文件流中读取数据

```JavaScript
/* 如何以流的方式读取文件 */
//创建一个读取流
let readerStream = fs.createReadStream('./database/data.json')
let count = 0;
let str = '';
//监听读取的状态
readerStream.on('data', (data) => {
  console.log('---开始接收---');
  console.log(`接收到的长度是：${data.length}`);
  str += data;
  count++
})
//监听什么时候读取完
readerStream.on('end', () => {
  console.log('---结束接收---');
  console.log(str.toString());
  //cont等于几就表示读取操作进行了多少次
  console.log(`读取操作进行了:${count}次`);
})
//监听错误信息
readerStream.on('error', (error) => {
  console.log(error)
})
```
## 11、fs.createWriteStream 写入文件

**createWriteStream传入的路径没有对应文件的话他会自己创建,存在对应文件的话会替换掉里面的内容**

```JavaScript
/* 以流的方式写入文件 */
let str = '';
for (let i = 0; i < 500; i++) {
  str += '我是从数据库获取的数据，我要保存起来\n'
}
// //创建写入流
const writerStream = fs.createWriteStream('./database/output.txt');
//使用utf 8 编码写入数据
writerStream.write(str, 'UTF-8');
//标记文件末尾,要监听写入完成的话需要在write之后写个end方法才会触发写入流里面的finish方法
writerStream.end();
//处理流事件-->finish事件
writerStream.on('finish', () => {
  /*finish-所有数据已被写入到底层系统时触发。*/
  console.log("写入完成。");
});
console.log("程序执行完毕");
```
## 12、管道流(主要用于复制大文件)

> 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。


我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。
以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。

```JavaScript
/*复制文件内容*/
const fs=require("fs");
// 创建一个可读流
const readerStream = fs.createReadStream('./database/output.txt');
// 创建一个可写流
const writerStream = fs.createWriteStream('./database/input.txt');
// 管道读写操作
// 读取 output.txt 文件内容，并将内容写入到 input.txt 文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕");

/*复制图片*/
// 创建一个可读流
const readerStream = fs.createReadStream('./upload/1.jpg');
// 创建一个可写流
const writerStream = fs.createWriteStream('./upload/images/1.jpg');
// 管道读写操作
// 读取 upload/1.jpg文件内容，并将内容写入到/upload/images/1.jpg文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕");
```
## 练习:判断服务器上面有没有upload目录,如果没有创建这个目录,如果有的话不操作.
```JavaScript
//判断服务器上面有没有upload目录,如果没有创建这个目录,如果有的话不操作.
const fs = require('fs');
let path = './upload'

fs.stat(path, (err, stats) => {
  if (err) {
    //  执行创建目录
    makedir(path);
    return;
  };
  if (!stats.isDirectory()) {
    /* 
     //首先删除文件, 再去执行创建目录
     fs.unlink(path, (err) => {
       if (!err) {
         makedir(path);
       } else {
         console.log("请检查传入的数据是否正确");
       };
     });
    */
    //首先重命名为.bak结尾的同名文件, 再去执行创建目录
    fs.rename(path, path + '.bak', (err) => {
      if (err) return;
      console.log(`存在同名文件,已备份为${path}.bak`);
      makedir(path);
    })
  };
})
/**
 * 创建目录的方法
 * @param {String} dir -需要创建目录的路径
 */
function makedir(dir) {
  fs.mkdir(dir, (err) => {
    if (err) return;
    console.log(`创建目录${dir}成功`);
  });
};
```
## 练习：创建wwwroot文件夹下面有images css js 以及index.html 
```JavaScript
//练习：创建wwwroot文件夹下面有images css js 以及index.html 

const fs = require('fs');
var dir = [['wwwroot'], ['images', 'css', 'js']];
let dirname = ''
function makedir(dir) {
  fs.mkdir(dir, (err) => {
    if (err) return;
    console.log(`创建目录${dir}成功`);
  });
};

function appendFiles(files, data) {
  fs.appendFile(files, data, (err) => {
    if (err) return;
    console.log(`追加文件${files}和内容成功`);
  })
};
dir.forEach((item, i) => {
  item.forEach((item, j) => {
    if (i < 1) {
      dirname = dir[0][j]
      makedir(dir[0][j])
    } else {
      makedir(dirname + '/' + dir[i][j])
    }
  });
});

if (dirname) {
  fs.readFile(dirname + '/index.html', (err, data) => {
    if (err) {
      appendFiles(dirname + '/index.html', 'Hello')
    };
  })
}

function detectStat(data) {
  fs.stat(data, (err, stats) => {
    if (err) {
      makedir()
    };
    if (!stats.isDirectory()) {
      //  执行创建目录
    } else {
      console.log(`目录${data}存在`);
    }
    console.log("是文件:%s,是目录:%s", stats.isFile(), stats.isDirectory());//是文件:false,是目录:true
  })
}
```
## 练习：wwwroot文件夹下面有images css js 以及index.html , 找出 wwwroot目录下面的所有的目录，然后放在一个数组中
```JavaScript
//练习：wwwroot文件夹下面有images css js 以及index.html , 找出 wwwroot目录下面的所有的目录，然后放在一个数组中

const fs = require('fs');
let path = './wwwroot';
let dirArr = []


//错误的写法    注意:fs里面的方法是异步方法
fs.readdir(path, (err, data) => {
  if (err) {
    console.log(err);
    return;
  };
  data.forEach(item => {
    fs.stat(path + '/' + item, (error, stats) => {
      if (stats.isDirectory()) {
        // console.log(`${item}是目录`);
        console.log(item);
        dirArr.push(item)
      }
    })
  });
});
//由于fs里面的方法(nodejs里面的方法几乎)都是异步方法, 所以现在 console.log(dirArr)为空
console.log(dirArr);//[]




// 用var打印出 3个3
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);//3,3,3
  }, 100);
}
// 为什么会出现这个结果,因为for循环完成速度很快,有可能在10毫秒的时候就已经完成了,这时候的i已经变成3了.设定的定时器在100毫秒以后才执行所以打印出3个3

// 用let打印出0,1,2
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);//0,1,2
  }, 100);
}


/**
 * 解决办法
 * 一.改造for循环  递归实现
 * 二.nodejs里面的新特性 async await (nodejs 8.x版本以后)
 */

/*一.改造for循环  递归实现*/
fs.readdir(path, (err, data) => {
  if (err) {
    console.log(err);
    return;
  };
  // console.log(data);
  //递归实现
  (function getDir(i) {
    if (i == data.length) {
      console.log(dirArr);//[ 'css', 'images', 'js' ]
      return;
    };
    fs.stat(path + '/' + data[i], (error, stats) => {
      if (stats.isDirectory()) {
        dirArr.push(data[i]);
      };
      getDir(i + 1);
    })
  })(0);
});

/* 二.nodejs里面的新特性 async await (nodejs 8.x版本以后) */

// 1.定义一个方法isDir判断一个资源到底是文件还是目录
async function isDir(path) {
  //需要注意的是fs是异步,所以需要return new Promise
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) {
        console.log(error);
        reject(reject);//失败的话外部处理错误信息
        return;
      };
      if (stats.isDirectory()) {
        resolve(true);
      } else {
        resolve(false);
      };
    });
  });
};

//2.获取wwwroot里面的所有资源 循环遍历 用isDir方法判断
async function main() {
  fs.readdir(path, async (err, data) => {//注意要用到await它外部的方法必须是async
    if (err) {
      // console.log(err);
      return;
    };
    for (let i = 0; i < data.length; i++) {
      if (await isDir(path + '/' + data[i])) {//await:把异步方法改成同步
        dirArr.push(data[i])
      };
    };
    console.log(dirArr);
  });
};
main();//[ 'css', 'images', 'js' ]
```