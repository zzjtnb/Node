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
