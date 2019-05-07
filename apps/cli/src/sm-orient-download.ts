import { readJSON, pathExists } from "fs-extra";
import program from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { Env } from './utils/get-env';
import { listDirs } from './utils/list-dirs';
const axios = require('axios');


const sh = require('shelljs');
const path = require('path');
const { getEnv } = require('./utils/get-env');

program
  .command('orient:download [version]')
  .option('-t, --tp3', 'Download TinkerPop 3 version')
  .description('Download new OrientDB version')
  .action(action)

async function action(version: string, options: {tp3: boolean}) {
  const { ENV, baseDir } = await getEnv(Env.DEV);
  const dir = path.resolve(baseDir, 'apps/db');
  const releasesDir = `${dir}/releases`;

  const downloaded = listDirs(releasesDir).map(v => {
    const parts = v.split('-');
    return parts[parts.length-1];
  });

  const toOptions = (v, i) => ({
    value: v.tag_name,
    short: v.tag_name,
    name: 'v'+v.tag_name + ((options.tp3) ? ' TP3':'') + ' (' + v.published_at.substring(0, 10)+ ')' + ((i===0) ? ' Latest':'') + ((downloaded.includes(v.tag_name)) ? ' EXISTS': '')
  });

  const versions: any = await axios.get('https://api.github.com/repos/orientechnologies/orientdb/releases').then(data => data.data.map(toOptions))

  if (!version) {
    const inputs: {version: string, tp3: string} = await inquirer.prompt([
      {
        type: 'list',
        name: 'version',
        default: versions[0],
        message: 'What version to download?',
        choices: versions,
        validate: (val, inputs2) => !!val,
      }
    ]);
    version = inputs.version;
  }

  // optionally use tinker pop 3 integrated version
  let tp3 = '';
  if (options.tp3) {
    tp3 = '-tp3';
  }

  const localFile = `${dir}/releases/orientdb${tp3}-${version}.tar.gz`;
  const remoteFile = `https://s3.us-east-2.amazonaws.com/orientdb3/releases/${version}/orientdb${tp3}-${version}.tar.gz`;
  const releaseDir = `${dir}/releases/orientdb${tp3}-${version}`;


  console.log(chalk.green('?'), 'downloading', chalk.blue(remoteFile), 'to', localFile);

  /**
   * DOWNLOAD
   */
  let download = true;
  if (await pathExists(localFile)) {
    download = await inquirer
      .prompt({
        type: 'confirm',
        name: 'download',
        default: false,
        message: 'File already exists, download it again?',
      })
      .then((inputs: {download: boolean}) => inputs.download);
  }

  if (download) {
    await sh.exec(`wget "--output-document=${localFile}" "${remoteFile}"`);
  }

  console.log(chalk.green('?'), 'UNZIP', chalk.green(localFile), 'to', releasesDir);

  /**
   * UNZIP
   */
  let replace = true;
  if (await pathExists(releaseDir)) {
    replace = await inquirer
      .prompt({
        type: 'confirm',
        name: 'replace',
        default: false,
        message: 'Release already exists, remove and extract it again?',
      })
      .then((inputs: {replace: boolean}) => inputs.replace);
  }

  if (replace) {
    await sh.exec(`tar -zxf "${localFile}" -C "${releasesDir}"`);
  }

  console.log(chalk.green('?'), chalk.green('DONE !!!'));

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
