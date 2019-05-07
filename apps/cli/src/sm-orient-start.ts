import program from 'commander';
import { getEnv, Env } from './utils/get-env';
import { exec } from "shelljs";

const spawn = require('child_process').spawn;
const sh = require('shelljs');
const path = require('path');
const chalk = require('chalk');

program
  .command('orient:start')
  .action(action);

async function action() {
  const { dbDir } = await getEnv(Env.DEV);
  const pm2Script = path.resolve(dbDir, 'pm2.json');

  console.log(
    chalk.green('?'),
    'starting orientdb server',
    chalk.blue(pm2Script),
  );
  exec(`cd ${dbDir} && pm2 start ${pm2Script}`);

  // TODO run pm2 package with the serwer

  // const prc = spawn('bash', [serverFile]);

  // //noinspection JSUnresolvedFunction
  // prc.stdout.setEncoding('utf8');
  // prc.stdout.on('data', function (data) {
  //   var str = data.toString()
  //   var lines = str.split(/(\r?\n)/g);
  //   console.log(lines.join(""));
  // });

  // prc.on('close', function (code) {
  //   console.log('process exit code ' + code);
  // });
}
