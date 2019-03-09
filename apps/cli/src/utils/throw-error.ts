const {red} = require('chalk');

module.exports.throwError = function(message) {
  console.log(red('------'));
  console.error(red('ERROR:'), message);
  console.log(red('------'));
  throw new Error(message);
}
