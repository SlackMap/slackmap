import program from 'commander';
import { Env, getEnv } from './utils/get-env';

const inquirer = require('inquirer');
const sh = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const { listDirs } = require('./utils/list-dirs');

program
  .command('orient:switch [version]')
  .description('Switch the current OrientDB version')
  .action(action);

async function action() {
  const { dbDir } = await getEnv(Env.DEV);
  const releasesDir = path.resolve(dbDir, 'releases');
  const currentDir = path.resolve(dbDir, 'current');
  const versions = listDirs(releasesDir);

  const currentVersion = await sh
    .exec('readlink -f ' + currentDir, { silent: true })
    .stdout.toString()
    .split('/')
    .reverse()[0].trim();

    if(currentVersion === 'current') {
      console.log(chalk.green('?'), chalk.yellow('No current version set, do it for the first time'));
    } else {
      console.log(chalk.green('?'),'current version is:', chalk.bgBlue(currentVersion));
    }

  const version = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'version',
        default: versions[0],
        message: 'Choose version to switch to',
        choices: versions,
        validate: val => !!val,
      },
    ])
    .then(inputs => inputs.version);

  const serverFile = path.join(releasesDir, version, 'bin', 'server.sh');

  const target = `${releasesDir}/${version}`;

  // switch symlinks
  console.log(chalk.green('?'), 'remove ', chalk.yellow(currentDir));
  await sh.exec(`rm -Rf ${currentDir}`);
  console.log(chalk.green('?'), 'symbolic link ', chalk.yellow(target), chalk.yellow(currentDir));
  // await sh.exec(`ln -s ${target} ${currentDir}`);
  await sh.ln(`-s`, target, currentDir);

  console.log(chalk.green('?'), 'orientdb switched to', chalk.yellow(version));
}
