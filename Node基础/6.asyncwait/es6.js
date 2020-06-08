/**
 * ES6里面常见的一些语法
 * 1.let const
 * 1.letconst
 * 2.箭头函数
 * 3.对象、属性的简写
 * 4.模板字符串
 * 5.Promise
 */


/*
//let是一个块作用域(var是全局作用域名)
if (true) {
  // var a = 'xxx'
  let a = 'xxx'
}
// console.log('var a=' + a);// var a=xxx
console.log('let a=' + a);//a is not
*/

/*
//const也是一个块作用域,定义常量(不可改变)
const PI = 3.14159
console.log(PI);//3.14159
PI = 3
console.log(PI);//Assignment to constant variable.
*/

/*
//模板字符串
let name = 'zhangsan';
let age = 20
console.log(`${name}的年龄是${age}`);//zhangsan的年龄20
// console.log("%s的年龄是%s", name, age);//zhangsan的年龄是20
*/

// 方法和属性的简写


/*
//第一种写法
let names = 'zhangsan';
let age = 20
//给app对象定义属性
let app = {
  //属性name对应的值names等于上面定义的let names = 'zhangsan';
  name: names,
  //属性age对应的值age等于上面定义的let age = 20;
  "age": age
}
console.log('%s的年龄是%s', app.name, app.age);//zhangsan的年龄是20
*/
/*
//属性的第二种写法
let name = 'zhangsan';
let age = 20;
//如果属性名称和变量名称一样的话可以简写成一个字段
let app = {
  name,
  age
};
console.log('%s的年龄是%s', app.name, app.age);//zhangsan的年龄是20
*/

/*
//方法的简写

//一般在对象写run方法这么写
let name = 'zhangsan';
let app = {
  name,
  run: function () {
    console.log(`${this.name}在跑步`);
  }
};
app.run();//zhangsan在跑步

//简写run方法
let name = 'zhangsan';
let app = {
  name,
  run() {
    console.log(`${this.name}在跑步`);
  }
};
app.run();//zhangsan在跑步
*/

/*
//箭头函数
//一般写法
let time1 = setTimeout(function () {
  console.log('我是一般写法');
  clearTimeout(time1)
}, 1000);
//ES6箭头函数(主要改变this执行) this指向上下文
let time2 = setTimeout(() => {
  console.log('我是一般写法');
  clearTimeout(time2)
}, 500);
*/

/*
//案例
function getData() {
  //ajax
  setTimeout(() => {
    var name = '张三';
    return name;
  }, 1000);
}
console.log(getData());//undefined
*/

/*解决上面这个问题*/

/*
 //1.回调函数 获取异步方法里面的数据
function getData(callbck) {
  //ajax
  setTimeout(() => {
    var name = '张三';
    callbck(name);
  }, 1000);
}

// var callbck = function (data) {
//   console.log(data + '111');
// }
// callbck(name);

//外部获取异步方法里面的数据
getData(function (data) {
  console.log(data);
})
*/

// 2.Promise用来处理异步 ,resolve 成功的回调函数, reject失败的回调函数

// let p = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     var name = '张三';
//     resolve(name);
//   }, 1000);
// })
// p.then((data) => {
//   console.log(data);
// })

// 封装上面的写法
//这一步就相当于把上面let p = new Promise(function(resolve, reject){})中的function抽离出去变成function getData(resolve, reject) {}
function getData(resolve, reject) {
  //ajax
  setTimeout(() => {
    let name = 'zhangsan';
    resolve(name);
  }, 1000);
}
//new Promise把getData传入
let p = new Promise(getData);
p.then((data) => {
  console.log(data);
})