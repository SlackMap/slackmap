import * as program from 'commander';

program
  .command('download', 'download new version of orientdb')
  .command('switch', 'switch to other release')
  .command('backup', 'manage orientdb backups')
  .parse(process.argv);
