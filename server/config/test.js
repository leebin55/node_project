module.exports = {
  database: {
    database: 'testDB',
    username: 'node',
    password: '12345',
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
  },
  redisUrl: 'redis://127.0.0.1:6379',
  mail: {
    host: 'localhost',
    port: Math.floor(Math.random() * 2000) + 10000, // random port :  10000 ~ 12000,
    tls: {
      rejectUnauthorized: false,
    },
  },
};
