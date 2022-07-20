module.exports = {
  database: {
    database: 'devDB',
    username: 'node',
    password: '12345',
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
  },
  mail: {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'tate.von39@ethereal.email',
      pass: '6A2G5fVC6Vqmbcpv5J',
    },
  },
  redisUrl: 'redis://127.0.0.1:6379',
};
