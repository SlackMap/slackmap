import program from 'commander';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';

program
  .command('help')
  .description('SlackMap Developer Manual START FROM HERE !!!')
  .action(action);

async function action() {
  clear();
  console.log('');
  console.log(chalk.yellow(figlet.textSync('SlackMap CLI', { horizontalLayout: 'full' })));
  console.log(chalk.green('------------------------------------'))
  console.log('')
  console.log(chalk.yellow('OrientDb Setup Manual'))
  console.log(chalk.yellow('1'), 'you have to use orient:download to get the newest version on your machine')
  console.log(chalk.yellow('2'), 'use orient:switch to set the new version as current')
  console.log(chalk.yellow('3'), 'use npm run db to start the server every time you want to run start database')
  console.log('')
  console.log(chalk.green('------------------------------------'))
  console.log('')
  console.log(chalk.yellow('OrientDB Backup Management '))
  console.log(chalk.yellow('1'), 'create backup with npm run db:backup <env> create')
  console.log(chalk.yellow('2'), 'restore backup with npm run db:backup <env> restore')
  console.log(chalk.yellow('3'), 'download backup from remote: npm run db:backup <env> download')
  console.log(chalk.yellow('4'), 'upload backup to remote: npm run db:backup <env> upload')
  console.log('')
  console.log(chalk.green('------------------------------------'))
}
