import { readJSON, pathExists, writeJSON } from "fs-extra";
import program from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { Env } from './utils/get-env';
import { listDirs } from './utils/list-dirs';
import { download } from './utils/download';
import { untargz } from './utils/unpack';
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
  const dir = path.resolve(baseDir, 'db');
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


  console.log(chalk.green('?'), 'downloading', chalk.green(remoteFile));
  console.log(chalk.green('?'), 'to', chalk.green(localFile));

  /**
   * DOWNLOAD
   */
  let shouldDownload = true;
  if (await pathExists(localFile)) {
    shouldDownload = await inquirer
      .prompt({
        type: 'confirm',
        name: 'download',
        default: false,
        message: 'File already exists, download it again?',
      })
      .then((inputs: {download: boolean}) => inputs.download);


    // remove existing download
    if(shouldDownload) {
      console.log(chalk.green('?'), 'remove local file', chalk.green(localFile));
      await sh.rm('-rf', localFile);
    }
  }

  if (shouldDownload) {
    console.log(chalk.green('?'), 'downloading', chalk.green(remoteFile));
    // await sh.exec(`wget "--output-document=${localFile}" "${remoteFile}"`);
    await download(remoteFile, localFile).then(() => console.log('DOWNLOADED')).catch(err => console.log(err));
  }

  console.log(chalk.green('?'), 'UNZIP', chalk.green(localFile), 'to', releaseDir);

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

    // remove existing download
    if(replace) {
      console.log(chalk.green('?'), 'remove databases dir', chalk.green(releaseDir));
      await sh.rm('-rf', releaseDir);
    }
  }

  if (replace) {
    console.log(chalk.green('?'), 'UNZIP to ', chalk.green(releaseDir));
    // await sh.exec(`tar -zxf "${localFile}" -C "${releasesDir}"`);
    await untargz(localFile, releasesDir);
  }

  console.log(chalk.green('?'), chalk.green('DONE !!!'));

  const databasesDir = `${releaseDir}/databases`;
  const configFile = `${releaseDir}/config/orientdb-server-config.xml`;
  const configTplFile = `${releaseDir}/config/orientdb-server-config.xml.tpl`;
  const sourceDatabasesDir = `${dir}/databases`;
  const sourceConfigFile = `${dir}/orientdb-server-config.xml`;

  // remove databases directory
  console.log(chalk.green('?'), 'remove databases dir', chalk.green(databasesDir));
  await sh.rm('-rf', databasesDir);

  // remove orientdb-server-config.xml and copy it to orientdb-server-config.xml.tpl
  if (await pathExists(configTplFile)) {
    console.log(chalk.green('?'), 'remove config file', chalk.green(configFile));
    await sh.rm('-rf', configFile);
  } else {
    console.log(chalk.green('?'), 'move config file', chalk.green(configFile), 'to', chalk.green(configTplFile));
    await sh.mv(configFile, configTplFile);
  }
  // await sh.rm('-rf', configFile);

  // symlink databases
  console.log(chalk.green('?'), 'symlink databases dir', sourceDatabasesDir, ' to ', chalk.green(databasesDir));
  await sh.ln(`-s`, sourceDatabasesDir, databasesDir);

  // & config.xml
  console.log(chalk.green('?'), 'symlink config file', sourceConfigFile, ' to ', chalk.green(configFile));
  // await sh.ln(`-sf`, sourceConfigFile, configFile);
  await sh.exec(`ln -sf ${sourceConfigFile} ${configFile}`);

  // place package.json with version
  await writeJSON(releaseDir + '/package.json', { version: version })
}
