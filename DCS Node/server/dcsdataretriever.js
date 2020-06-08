module.exports = function DCSDataRetriever(dataCallback) {

  const port = 3001;
  const host = "localhost";
  const net = require('net');
  let buffer;

  function connect() {

    const client = net.createConnection(port, host);

    client.on('connect', function () {
      let time = new Date();
      console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: 连接到DCS服务器');
    });
    client.on('data', (data) => {
      console.log(data);
      // buffer += data;
      // while ((i = buffer.indexOf("\n")) >= 0) {
      //   let data = JSON.parse(buffer.substring(0, i));
      //   dataCallback(data);
      //   buffer = buffer.substring(i + 1);
      // }
    });
    client.on('close', () => {
      time = new Date();
      console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ' :: 从DCS服务器断开连接');
    });
    client.on('error', () => {
      connect();
    });
  }

  connect();
};