function ajax(url, fn) {
  //1.创建ajax对象.兼容IE6
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  /**
   * 2.向服务器请求的方式
   * GET  请求方式
   * URL  请求地址
   * true 同步异步的布尔值(true表示异步)
   */
  xhr.open("GET", url, true);
  /**
 * 3.发送请求
 */
  xhr.send();
  /**
 * 4.添加监听状态改变事件
 */
  xhr.onreadystatechange = function () {
    /**
   * xhr.readyState == 4 表示ajax已经与服务器建立正确的连接
   * xhr.status == 200  表示ajax在服务器上面找到我们要请求的资源
   */
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (typeof fn === 'function') {
        //通过回调函数将数据返回到客户端
        fn(xhr.responseText);
      }
    }
  };
}

// 调用
// ajax(url, (res) => {
//   console.log(res);
//   let data = JSON.parse(res);
//   console.log(data);
// })