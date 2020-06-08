const fs = require('fs')
let charset = ';charset="utf-8"'
exports.getMime = function (extname) {

  switch (extname) {
    case '.html':
      return 'text/html' + charset;
    case '.css':
      return 'text/css' + charset;
    case '.js':
      return 'text/javascript' + charset;
    case '.json':
      return "application/json";
    default:
      return 'text/html' + charset;
  }
}
exports.getFileMime = function (extname) {

  let data = fs.readFileSync('./data/mime.json');//同步读取数据
  let mineObj = JSON.parse(data.toString())
  return mineObj[extname] + charset
}