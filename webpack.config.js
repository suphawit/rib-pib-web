/**
 * @author: @AngularClass
 */

console.log(process.env.aaa)
// Look in ./config folder for webpack.dev.js
switch (process.env.IONIC_ENV) {
  case 'prod':
  case 'production':
  module.exports = require('./config/webpack.dev.js');
    break;
  case 'test':
  case 'testing':

    break;
  case 'dev':
  case 'development':
  default:
       module.exports = require('./config/webpack.dev.js');
}
