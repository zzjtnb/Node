//练习：wwwroot文件夹下面有images css js 以及index.html , 找出 wwwroot目录下面的所有的目录，然后放在一个数组中

const fs = require('fs');
let path = './wwwroot';
let dirArr = []

/*
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
*/


/*
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
*/

/**
 * 解决办法
 * 一.改造for循环  递归实现
 * 二.nodejs里面的新特性 async await (nodejs 8.x版本以后)
 */

/*一.改造for循环  递归实现*/
// fs.readdir(path, (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   // console.log(data);
//   //递归实现
//   (function getDir(i) {
//     if (i == data.length) {
//       console.log(dirArr);//[ 'css', 'images', 'js' ]
//       return;
//     };
//     fs.stat(path + '/' + data[i], (error, stats) => {
//       if (stats.isDirectory()) {
//         dirArr.push(data[i]);
//       };
//       getDir(i + 1);
//     })
//   })(0);
// });

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
module.exports = main