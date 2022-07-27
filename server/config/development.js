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
      user: 'lilla.davis85@ethereal.email',
      pass: 'wFvJvWKSZJkFU9S3fm',
    },
  },
  redisUrl: 'redis://127.0.0.1:6379',
};
