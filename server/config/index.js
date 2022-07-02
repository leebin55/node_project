const dev = require('./development');
const staging = require('./staging');
const test = require('./intest');
const production = require('./production');

module.exports = {
  development,
  staging,
  test,
  production,
};
