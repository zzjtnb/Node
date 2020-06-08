# Node+MySql构建登录注册接口

## 一.快速生成package.json
```js
npm init --yes
```

## 二.安装模块

- 1.安装nodemon
>项目中安装
```js
npm i nodemon -S
```

>全局安装(nodemon建议全局安装)
```js
npm i nodemon -g
```
- 2.安装express
```js
npm i express -S
```
- 3.安装Sequelize     使用对象方式对数据库进行操作
```js
npm i sequelize -S
```
- 4.安装mysql2        对MySql操作
```js
npm install mysql2 --save
```
- 5.安装body-parser   解决POST请求传过来的数据
```js
npm i body-parser -S
```
- 6.安装bcryptjs      加密解密密码
```js
npm i bcryptjs -S
```
- 7.安装jsonwebtoken  认证
```js
npm i jsonwebtoken -S
```

以上依赖一句话安装
```js
npm i nodemon express sequelize mysql2 body-parser bcryptjs jsonwebtoken -S
```
以上为开发时的过程

## 三. 使用

- 1.安装依赖
```js
npm install
```
- 2.运行
```js
npm run dev
```