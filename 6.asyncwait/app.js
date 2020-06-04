// async function testAsync() {
//   return 'Helloasync';
// }
// const result = testAsync();
// console.log(result);//Promise { 'Helloasync' }
/*
// 1.普通方法
function test() {
  return "Hello Node.js"
}
console.log(test());
*/
// 2.异步方法
// async function test() {
//   return "Hello Node.js"
// }
// console.log(test());//Promise { 'Hello Node.js' }
//async的方法可以返回一个Promise也可以直接返回结果
// async function test() {
//   return "Hello Node.js"
// }
// console.log(await test());//错误:await必须的用在async的方法里面

// async function test() {
//   return "Hello Node.js";
// };
// async function main() {
//   let data = await test();//获取异步方法里面的数据
//   console.log(data);
// };
// main();

// function getData() {
//   return 'zhangsan';
// }
// async function testAsync() {
//   return 'Hello async';
// }

// async function test() {
//   const v1 = await getData();
//   const v2 = await testAsync();
//   console.log(v1, v2);
// }
// test();//zhangsan Hello async
// //async用于声明一个异步方法,await是等待这个异步方法执行完成,await必须用在异步的方法里面
// async function test() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let name = 'zhangsan';
//       resolve(name);
//     }, 1000);
//   });
// };
// async function main() {
//   let data = await test();
//   console.log(data);
// };
// main();//zhangsan
// function findData() {
//   return new Promise(resolve => {
//     setTimeout(() => resolve("long_time_value"), 1000);
//   });
// }

// async function test() {
//   const v = await findData();
//   console.log(v);
// }
// test();
