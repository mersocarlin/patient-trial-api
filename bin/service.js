require('babel-core/register');
require('babel-polyfill');


var app = require('../src/');
app.start(require('../config').default)
  .catch(function (error) {
    console.error(error);
  });
