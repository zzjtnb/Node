# Nodejs 新特性 async await 的使用以及使用 asyncawait 处理异步

# 目录

- 一、 Es 6 常见语法的使用
- 二、 Async、Await和Promise的使用

## 一、 **ES6** 常见语法的使用

- 1.let const
- 2.箭头函数
- 3.对象属性的简写和方法的简写
- 4.模板字符串
- 5.Promise

### 1.letc onst
#### let
```JavaScript
/*let是一个块作用域(var是全局作用域名)*/
if (true) {
  // var a = 'xxx'
  let a = 'xxx'
}
// console.log('var a=' + a);// var a=xxx
console.log('let a=' + a);//a is not
```
#### const
```JavaScript
/*const也是一个块作用域,定义常量(不可改变)*/
const PI = 3.14159
console.log(PI);//3.14159
PI = 3
console.log(PI);//Assignment to constant variable.
```
### 2.箭头函数(主要改变this执行) this指向上下文
```JavaScript
//一般写法
let time1 = setTimeout(function () {
  console.log('我是一般写法');
  clearTimeout(time1)
}, 1000);
//ES6箭头函数
let time2 = setTimeout(() => {
  console.log('我是一般写法');
  clearTimeout(time2)
}, 500);
```
### 3.对象属性的简写和方法的简写

#### 对象属性的简写
```JavaScript
//属性第一种写法
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

//属性的第二种写法
let name = 'zhangsan';
let age = 20;
//如果属性名称和变量名称一样的话可以简写成一个字段
let app = {
  name,
  age
};
console.log('%s的年龄是%s', app.name, app.age);//zhangsan的年龄是20
```
#### 方法的简写
```JavaScript
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
```
### 4.模板字符串
#### 模板字符串输出
```JavaScript
let name = 'zhangsan';
let age = 20
console.log(`${name}的年龄是${age}`);//zhangsan的年龄是20
```
#### 占位符输出
```JavaScript
let name = 'zhangsan';
let age = 20
console.log("%s的年龄是%s", name, age);//zhangsan的年龄是20
```
### 5.Promise(用来处理异步)
- resolve 成功的回调函数
- reject  失败的回调函数
#### 案例
```JavaScript
function getData() {
  //ajax
  setTimeout(() => {
    var name = '张三';
    return name;
  }, 1000);
}
console.log(getData());//undefined
//因为:在下面console调用getData的时候setTimeout设置的1秒钟后才返回,console.log(getData())先执行,所有是undefined
```
#### 解决办法
1.回调函数(callbck) 获取异步方法里面的数据
```JavaScript
//回调函数(callbck) 获取异步方法里面的数据
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
```
2.ES6中的Promise(resolve 成功的回调函数, reject失败的回调函数)
```JavaScript
//第一种写法
let p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    var name = '张三';
    resolve(name);
  }, 1000);
})
p.then((data) => {
  console.log(data);
})
```
封装上面的第一种写法
```JavaScript
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
```

## 二、 **Async** 、 **Await** 和 **Promise** 的使用
**Async**和**await**是**ES7**里面的写法,要用这两个的时候需要结合**ES6**里面的**Promise**.

**Async** 是“异步”的简写，而 **await** 可以认为是 **asyncwait** 的简写。所以应该很好理解**async**用于申明一个异步的 **function** ，而**await**用于等待一个异步方法执行完成。

### 简单理解：

**async** 是让方法变成异步。

**await** 是等待异步方法执行完成。

### 详细说明：

**async** 是让方法变成异步，在终端里用node执行这段代码，你会发现输出了Promise{‘Helloasync’}，这时候会发现它返回的是Promise。

```JavaScript
async function testAsync() {
  return 'Helloasync';
}
const result = testAsync();
console.log(result);//Promise { 'Helloasync' }
```

**await** 在等待 **async** 方法执行完毕，其实await等待的只是一个表达式，这个表达式在官方文档里说的是Promise对象，但是它也可以接受普通值。 

**注意**：**await**必须在**async**方法中才可以使用因为await访问本身就会造成程序停止堵塞，所以必须在异步方法中才可以使用。

1.普通方法
```JavaScript
function test() {
  return "Hello Node.js";
};
console.log(test());
```
2.比上面的普通方法变为异步方法
```JavaScript
async function test() {
  return "Hello Node.js";
};
console.log(test());//Promise { 'Hello Node.js' }
```
async的方法可以返回一个Promise也可以直接返回结果
```JavaScript
//错误写法-await必须的用在async的方法里面
async function test() {
  return "Hello Node.js";
};
console.log(await test()); //SyntaxError: missing ) after argument list

//正确的写法
async function test() {
  return "Hello Node.js";
};
async function main() {
  let data = await test();//获取异步方法里面的数据
  console.log(data);
};
main();//Hello Node.js
```
demo
```JavaScript
function getData() {
  return 'zhangsan';
}
async function testAsync() {
  return 'Hello async';
}

async function test() {
  const v1 = await getData();
  const v2 = await testAsync();
  console.log(v1, v2);
}
test();//zhangsan Hello async
```
async用于声明一个异步方法,await是等待这个异步方法执行完成,await必须用在异步的方法里面.
在async的方法里面建议返回一个Promise而不是向上面一样直接返回一个字符串
```JavaScript
async function test() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let name = 'zhangsan';
      resolve(name);
    }, 1000);
  });
};
async function main() {
  let data = await test();
  console.log(data);
};
main();//zhangsan
```
**async/await** 同时使用

async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而
await 会等待这个Promise完成，并将其resolve的结果返回出来。

```JavaScript
function findData() {
  return new Promise(resolve => {
    setTimeout(() => resolve("long_time_value"), 1000);
  });
}

async function test() {
  const v = await findData();
  console.log(v);
}
test();
```

