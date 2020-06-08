const bcryptjs = require('bcryptjs')
let bcrypt = {}
/**
 * @param {String} params  需要加密的数据
 */
bcrypt.hash = function (params) {
  return new Promise((resolve) => {
    bcryptjs.hash(params, 10, (err, hash) => {
      resolve(hash);
    })
  });

}
/**
 * @param {String} reqData  需要比较的数据
 * @param {String} hash  比较值
 */
bcrypt.compare = function (reqData, hash) {
  return new Promise((resolve) => {
    bcryptjs.compare(reqData, hash, (err, res) => {
      resolve(res)
    });
  })
}

module.exports = bcrypt