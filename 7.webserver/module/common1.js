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
  return new Promise((resolve, reject) => {
    fs.readFile('./data/mime.json', (err, data) => {
      if (err) {
        reject(err)
        return;
      }
      let mimeObj = JSON.parse(data)
      resolve(mimeObj[extname] + charset)
    })
  })
}