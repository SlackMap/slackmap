import program from 'commander';
import chalk from 'chalk';

program
  .command('orient')
  .description('Manual of how to setup OrientDB for the project development')
  .action(function() {
    program.help();
  });
