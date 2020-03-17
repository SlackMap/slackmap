const { red } = require('chalk');

export function throwError(message) {
  console.log(red('------'));
  console.error(red('ERROR:'), message);
  console.log(red('------'));
  throw new Error(message);
};
