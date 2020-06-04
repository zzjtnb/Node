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