//判断服务器上面有没有upload目录,如果没有创建这个目录,如果有的话不操作.
const fs = require('fs');
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
async function isDir(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) {
        console.log(error);
        reject(error)
        return;
      }
      if (stats.isDirectory()) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  })
}

function mkdir(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        //  执行创建目录
        makedir(path);
        return;
      };
      if (!stats.isDirectory()) {
        //首先重命名为.bak结尾的同名文件, 再去执行创建目录
        fs.rename(path, path + '.bak', (err) => {
          if (err) return;
          console.log(`存在同名文件,已备份为${path}.bak`);
          makedir(path);
        })
      };
    })
  })
}
const obj = {
  mkdir
}
module.exports = obj


