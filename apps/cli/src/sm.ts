

import program from 'commander';
// const program = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

clear();
import "./sm-orient";
import './sm-orient-download'
import './sm-orient-switch'
import './sm-orient-start'


console.log('');
console.log(chalk.yellow(figlet.textSync('SlackMap', { horizontalLayout: 'full' })));
program
  .version('0.0.1', '-v, --version')
  .description('Mange SlackMap infrastructure. ')

program.parse(process.argv);

// if no command display help info
if (program.args.length === 0) {
  program.help();
}
