import program from 'commander';
import chalk from 'chalk';

program
  .command('orient')
  .description('Manual of how to setup OrientDB for the project development')
  .action(function() {
    console.log(chalk.green('------------------------------------'))
    console.log('')
    console.log(chalk.yellow('OrientDb Setup Manual'))
    console.log(chalk.yellow('1'), 'you have to use orient:download to get the newest version on your machine')
    console.log(chalk.yellow('2'), 'use orient:switch to set the new version as current')
    console.log(chalk.yellow('3'), 'remember, you have to instal PM2 globally, npm i -g pm2')
    console.log(chalk.yellow('4'), 'use orient:start to start the server every time you want to work')
    console.log('')
    console.log(chalk.green('------------------------------------'))
    console.log('')
    console.log(chalk.yellow('SlackMap CLI'))
    program.help();
  });
