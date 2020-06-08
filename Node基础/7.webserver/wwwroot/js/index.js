window.onload = () => {
  /**
  * JSON 通常用于与服务端交换数据。
  * 在接收服务器数据时一般是字符串。
  * 我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。
  * 我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串。
  */
  let url = '../data.json?123'
  //操作DOM
  getData(url, (res) => {
    let data = JSON.parse(res);
    document.getElementById('name').innerHTML = `姓名:${data.data.name}`;
    document.getElementById('age').innerText = `年龄:${data.data.age}`
  });
  function getData(url, callbck) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
      if (xhr.status == 200) {
        callbck(xhr.responseText);
      }
    }
    xhr.open('GET', url, false);
    xhr.send();
  };
  //let url = '../data.json?123'
  // ajax(url, (res) => {
  //   let data = JSON.parse(res);
  // })
};