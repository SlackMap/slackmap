import * as program from "commander";

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

clear();
console.log('')
console.log(chalk.yellow(figlet.textSync('SlackMap', { horizontalLayout: 'full' })));
program
    .version('0.0.1', '--version')
    .description('Mange the infrastructure of SlackMap... ')
    .command('orient', 'manage OrientDB database')
    .command('deploy', 'manage orientdb backups')
    .command('stats', 'display system stats', { isDefault: false });


// allow commander to parse `process.argv`
program.parse(process.argv);

// if no command display help info
if (program.args.length === 0) {
  program.help();
}
