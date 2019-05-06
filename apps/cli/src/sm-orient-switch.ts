import program from 'commander';

const inquirer = require('inquirer');
const sh = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const { askForEnv } = require('./utils/ask-for-env');
const { listDirs } = require('./utils/list-dirs');

program
  .arguments('[version]')
  .action(downloadAction)
  .parse(process.argv);

async function downloadAction() {
  const { BASE_DIR } = await askForEnv('dev');
  const releasesDir = path.resolve(BASE_DIR, 'infra/db/releases');
  const currentDir = path.resolve(BASE_DIR, 'infra/db/current');
  const versions = listDirs(releasesDir);

  const currentVersion = await sh
    .exec('readlink -f ' + currentDir, { silent: true })
    .stdout.toString()
    .split('/')
    .reverse()[0];

  console.log(
    chalk.green('?'),
    'current version is:',
    chalk.blue(currentVersion.trim()),
  );

  const version = await inquirer
    .prompt([
      {
        type: 'list',
        name: 'version',
        default: versions[0],
        message: 'Choose versio to swtich to',
        choices: versions,
        validate: val => !!val,
      },
    ])
    .then(inputs => inputs.version);

  const serverFile = path.join(releasesDir, version, 'bin', 'server.sh');

  const target = `${releasesDir}/${version}`;

  // switch symlinks
  await sh.exec(`rm -Rf ${currentDir}`);
  await sh.exec(`ln -s ${target} ${currentDir}`);

  console.log(chalk.green('?'), 'orientdb switched to', chalk.blue(version));
}
