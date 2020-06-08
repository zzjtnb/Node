const db = {
  test1: {
    'database': 'dcs world',
    'username': 'root',
    'password': 'root',
    'options': {
      'host': 'localhost',
      'port': 3306,
      "dialect": "mysql",
      'pool': {
        max: 5,
        min: 0,
        idle: 1000,//最长空置时间（毫秒），超时后释放连接
        acquire: 3000//连接池尝试连接最长时间（毫秒），超过抛出异常
      },
    }
  },
  test2: {
    "dialect": "mysql",
    'host': 'localhost',
    'port': 3306,
    'username': 'root',
    'password': 'root',
    'database': 'nodesql',
    'pool': {
      max: 5,
      min: 0,
      idle: 1000,//最长空置时间（毫秒），超时后释放连接
      acquire: 3000//连接池尝试连接最长时间（毫秒），超过抛出异常
    },
  }
};
module.exports = db