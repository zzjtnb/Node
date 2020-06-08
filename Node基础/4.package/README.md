## 一、包与NPM

Nodejs 中除了它自己提供的核心模块外，我们可以自定义模块，也可以使用第三方的
模块。Nodejs 中第三方模块由包组成，可以通过包来对一组具有相互依赖关系的模块进行统一管理。

### 1.完全符合 CommonJs 规范的包目录一般包含如下这些文件。
- package.json :包描述文件。
- bin :用于存放可执行二进制文件的目录。
- lib :用于存放 JavaScript 代码的目录。
- doc :用于存放文档的目录。

### 2.包的使用

- 1.在https://www.npmjs.com寻找对应的包
- 2.在项目中使用 `npm install xxx`
- 3.引入xxx `var xxx=require('xxx')`
  
### 3.NPM 介绍
npm 是世界上最大的开放源代码的生态系统。我们可以通过 npm 下载各种各样的包，
这些源代码（包）我们可以在 https://www.npmjs.com 找到。
npm 是随同 NodeJS 一起安装的包管理工具，能解决 NodeJS 代码部署上的很多问题，
常见的使用场景有以下几种：
- 允许用户从 NPM 服务器下载别人编写的第三方包到本地使用。
- 允许用户从 NPM 服务器下载并安装别人编写的命令行程序(工具)到本地使用。
- 允许用户将自己编写的包或命令行程序上传到 NPM 服务器供别人使用。


## 二、node查看版本

`node -v`

注意是小写的v

## 三、NPM 命令详解。

- 1.`npm -v` 查看 npm 版本 注意是小写的v
- 2.`npm install moudleName` 安装模块
- 3.`npm uninstall moudleName` 卸载模块
- 4.`npm info moudleName`查看模块的版本
- 5.`npm list `查看当前目录下已安装的 node 包
- 6.` npm install moudleName@1.8.0` @1.0.0指定版本安装
  
## 四、package.json
>package.json定义了这个项目所需要的各种模块,以及项目的配置信息(比如名称、版本、许可证等元数据)
- 1、创建 package.json
`npm init` 或者 `npm init -y`
- 2、`package.json` 文件
```json
{
  "name": "axios",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "doc": "doc",
    "lib": "lib"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
```
- 3、安装模块并把模块写入`package.json`(依赖)
```bash
npm install moudleName --save
npm install moudleName --save-dev
```
- 4、`dependencies` 与 `devDependencies` 之间的区别?

使用 `npm install moudleName –save` 自动更新 `dependencies` 字段值;
使用 `npm install moudleName –save-dev` 自动更新 `devDependencies` 字段值;

`dependencie` 配置当前程序所依赖的其他包.
`devDependencie` 配置当前程序所依赖的其他包，比如一些工具之类的配置在这里.

>不过这只是它们的表面区别。它们真正的区别是，npm自己的文档说**dependencies是运行时依赖**，**devDependencies是开发时的依赖**。即devDependencies 下列出的模块，是我们开发时用的，比如 我们安装 js的压缩包gulp-uglify 时，我们采用的是 “`npm install –save-dev gulp-uglify` ”命令安装，因为我们在发布后用不到它，而只是在我们开发才用到它。dependencies 下的模块，则是我们发布后还需要依赖的模块，譬如像jQuery库或者Angular框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了。

>另外需要补充的是：
正常使用`npm install`时，会下载dependencies和devDependencies中的模块，当使用`npm install –production`或者注明**NODE_ENV**变量值为**production**时，只会下载dependencies中的模块。


```json
"dependencies": {
   "ejs": "^2.3.4", 
   "formidable": "~1.0.17",
   "express": "*"
}
```
`^`表示第一位版本号不变，后面两位取最新的
`~`表示前两位不变，最后一个取最新
`*`表示全部取最新

## 五、安装淘宝镜像
`http://www.npmjs.org npm` 包官网
`https://npm.taobao.org ` 淘宝 npm 镜像官网
>淘宝 NPM 镜像是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10 分钟 一次以保证尽量与官方服务同步。
*我们可以使用我们定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:*
`npm install -g cnpm --registry=https://registry.npm.taobao.org`