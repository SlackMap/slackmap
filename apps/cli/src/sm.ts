import program from 'commander';

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

program
  .version('0.0.1', '-v, --version')
  .description('Mange SlackMap infrastructure. ')

import "./sm-help";
import './sm-orient-download';
import './sm-orient-switch';
import './sm-orient-start';

if(process.argv.length <= 2) {
  clear();
  console.log('');
  console.log(chalk.yellow(figlet.textSync('SlackMap CLI', { horizontalLayout: 'full' })));
}

program.parse(process.argv);

