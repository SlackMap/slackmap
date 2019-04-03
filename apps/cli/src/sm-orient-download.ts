import * as program from 'commander';

const inquirer = require('inquirer');

const sh = require('shelljs');
const path = require('path');
const fs = require('fs-extra');
const { askForEnv } = require('./utils/ask-for-env');

program
  .arguments('[version]')
  .action(downloadAction)
  .parse(process.argv);

/**
 *
 * @param {string} version
 */
async function downloadAction(version) {
  const { ENV, BASE_DIR } = await askForEnv('dev');

  let tp3 = '';
  if (!version) {
    const inputs = await inquirer.prompt([
      {
        type: 'input',
        name: 'version',
        default: '3.0.10',
        message: 'What version to dwonload?',
        validate: (val, inputs2) => !!val,
      },
      {
        type: 'confirm',
        name: 'tp3',
        default: false,
        message: 'Use TinkerPop 3 version?',
      },
    ]);
    version = inputs.version;
    if (inputs.tp3) {
      tp3 = '-tp3';
    }
  }

  const dir = path.resolve(BASE_DIR, 'infra/db');

  const localFile = `${dir}/downloads/orientdb${tp3}-${version}.tar.gz`;
  const remoteFile = `https://s3.us-east-2.amazonaws.com/orientdb3/releases/${version}/orientdb${tp3}-${version}.tar.gz`;
  // const remoteFile = `https://s3.us-east-2.amazonaws.com/orientdb3/releases/3.0.10/orientdb-3.0.10.tar.gz`;
  // const remoteFile = `https://s3.us-east-2.amazonaws.com/orientdb3/releases/3.0.10/orientdb-tp3-3.0.10.tar.gz`;
  const releasesDir = `${dir}/releases`;
  const releaseDir = `${dir}/releases/orientdb${tp3}-${version}`;

  /**
   * DOWNLOAD
   */
  let download = true;
  if (await fs.exists(localFile)) {
    download = await inquirer
      .prompt({
        type: 'confirm',
        name: 'download',
        default: false,
        message: 'File already exists, download it again?',
      })
      .then(inputs => inputs.download);
  }
  console.log('redown', download);
  if (download) {
    await sh.exec(`wget "--output-document=${localFile}" "${remoteFile}"`);
  }

  /**
   * UNZIP
   */
  let replace = true;
  if (await fs.exists(releaseDir)) {
    replace = await inquirer
      .prompt({
        type: 'confirm',
        name: 'replace',
        default: false,
        message: 'Release already exists, remove and extract it again?',
      })
      .then(inputs => inputs.replace);
  }
  console.log('replace', replace);
  if (replace) {
    await sh.exec(`tar -zxf "${localFile}" -C "${releasesDir}"`);
  }
  // return;
  // // download spatial plugin
  // // in version 3.x we probably don't need this
  // await shipit.local(`wget "--output-document=${releaseDir}/lib/${spatialName}" "http://central.maven.org/maven2/com/orientechnologies/orientdb-spatial/${spatialVersion}/${spatialName}"`);

  // // remove databases & config.xml
  // await shipit.local(`rm -Rf "${releaseDir}/databases"`);
  // await shipit.local(`rm -Rf "${releaseDir}/config/orientdb-server-config.xml"`);

  // // symlink databases & config.xml
  // await shipit.local(`ln -s "${dir}/databases" "${releaseDir}/databases"`);
  // await shipit.local(`ln -s "${baseDir}/config/orientdb-server-config.xml" "${releaseDir}/config/orientdb-server-config.xml"`);

  // // place package.json with version
  // await fs.writeJson(releaseDir + '/package.json', { version: version })
}
