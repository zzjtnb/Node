/**
 * 正确统计连接服务器的客户端数量
 */
module.exports = function DCSDataRetriever(dataCallback) {
  function connect() {
    const port = 3001;
    const host = "localhost";
    let time = new Date();
    const net = require("net");//引入net模块
    const server = net.createServer(function (socket) {//创建TCP服务器
      console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: DCS World Connected server!');
      const maxConnections = 3;
      server.maxConnections = maxConnections;////设置最大连接数量
      server.getConnections(function (err, count) {
        if (count >= maxConnections) {
          console.log("已到最大连接数");
        } else {
          console.log("the count of client is " + count);
        }
      });
      socket.on('end', () => {
        console.log('DCS World已断开连接');
      });
      buffer = "";
    })
    server.on('data', (data) => {
      console.log(data);
      // buffer += data;
      // while ((i = buffer.indexOf("\n")) >= 0) {
      //   let data = JSON.parse(buffer.substring(0, i));
      //   dataCallback(data);
      //   buffer = buffer.substring(i + 1);
      // }
    });
    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.log('地址正被使用，重试中...');
        setTimeout(() => {
          server.close();
          server.listen(port, host);
        }, 1000);
      }
    });
    /* 获取监听端口 */
    server.listen(port, function () {
      console.log(`服务已创建并监听${port}端口,等待DCS World连接`);
      // console.log(`Creat server on http://${host}:${port}`);
    })
  }

  connect();
};