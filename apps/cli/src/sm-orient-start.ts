import * as program from 'commander';

const inquirer = require('inquirer');
const spawn = require('child_process').spawn;
const sh = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const { askForEnv } = require('./utils/ask-for-env');
const { listDirs } = require('./utils/list-dirs');

console.log('start');
program
  .arguments('[version]')
  .action(action)
  .parse(process.argv);

/**
 *
 * @param {string} version
 */
async function action(version) {
  const { BASE_DIR } = await askForEnv('dev');
  const releasesDir = path.resolve(BASE_DIR, 'infra/db/releases');
  const versions = listDirs(releasesDir);
  if (!version) {
    version = await inquirer
      .prompt([
        {
          type: 'list',
          name: 'version',
          default: versions[0],
          message: 'What version to run',
          choices: versions,
          validate: val => !!val,
        },
      ])
      .then(inputs => inputs.version);
  }
  const serverFile = path.join(releasesDir, version, 'bin', 'server.sh');
  console.log(
    chalk.green('?'),
    'running orientdb server',
    chalk.blue(serverFile),
  );

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
