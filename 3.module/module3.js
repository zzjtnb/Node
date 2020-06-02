/* --------------------------------axios---------------------------------- */
/**
 * 对应3.module\node_modules\axios\index.js
 */
/* 引入方式一
const axios = require('./node_modules/axios/index');
axios.get();//从服务器获取数据
*/

/* 引入方式二
const axios = require('axios/index');
axios.get();//从服务器获取数据
axios.post();//向服务器提交数据
*/

/* 引入方式三
const axios = require('axios');
axios.get();//从服务器获取数据
axios.post();//向服务器提交数据
*/

/* --------------------------------db---------------------------------- */

/* 
// 无package.json--Error: Cannot find module 'db'
var db = require('db')//Error: Cannot find module 'db'
db.add() 
*/

//有package.json
var db = require('db')
db.add()//增加数据

/**
 * 总结:
 * 1.在node_modules里面定义的模块我们在引用的时候可以不写完整路径只写node_modules里面对应的文件.
 * 2.nodejs里面的自定义模块都是放在node_modules里面,如果在node_modules里面我们在引用的时候可以直接require('文件夹名').
 * 3.nodejs会默认找node_modules对应模块里面的index.js,
 *  解决办法是在对应模块下面使用'npm init'(npm init --yes)生成package.json,package.json里面的main对应的值为对应的入口文件
 */