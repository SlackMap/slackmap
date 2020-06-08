const path = require('path');
const chalk = require('chalk');

const inquirer = require('inquirer');

module.exports = async function(shipit) {
  const log = shipit.log.bind(shipit);

  const host = process.env.SSH_HOST;
  const user = process.env.SSH_USER;

  shipit.initConfig({
    default: {
      workspace: path.resolve(__dirname, 'apps/db/current'),
      localDbDir: path.resolve(__dirname, 'apps/db'),
    },
    test: {
      deployTo: `/home/${user}/test/db`,
      servers: `${user}@${host}`,
      command: 'remote',
    },
    prod: {
      deployTo: `/home/${user}/prod/db`,
      servers: `${user}@${host}`,
      command: 'remote',
    },
    dev: {
      deployTo: path.resolve(__dirname, 'apps/db'),
      servers: 'localhost',
      command: 'local',
    },
  });

  /**
   * Create backup
   */
  shipit.task('create', async function() {
    const inputs = await inquirer.prompt([
      {
        type: 'input',
        name: 'tag',
        default: '',
        message: 'Tag name? Extra name to identify the backup file',
      },
    ]);

    let tagName = '';
    if (inputs.tag) {
      tagName = '_' + inputs.tag;
    }

    const env = this.environment;
    const dir = this.config.deployTo;
    const date = new Date()
      .toJSON()
      .replace('T', '_')
      .replace(':', '')
      .replace(':', '')
      .replace('.', '')
      .substr(0, 17);
    const file = `smdb_${env}_${date}${tagName}.zip`;
    const dbDir = `${dir}/databases/smdb_${env}`;

    // stop the server
    await shipit[this.config.command](`pm2 stop ${dir}/pm2.json`);

    // just zip the db directory, NOTE: we ignore .wal files, official backup does this to :)
    await shipit[this.config.command](
      `cd ${dbDir} && zip -r --exclude=*.wal* ${dir}/backups/${file} ./`,
    );

    // use the backup script, but we don't use it, it's hard to get password here and do it secure, for now at least :)
    // await shipit[this.config.command](`${dir}/current/bin/backup.sh plocal:${dir}/current/databases/smdb_${env} admin admin ${dir}/backups/${file}`);

    // start the server back
    await shipit[this.config.command](`cd ${dir} && pm2 startOrReload ./pm2.json`);
  });

  /**
   * RESTORE
   */
  shipit.task('restore', async function() {
    const env = this.environment;
    const date = new Date()
      .toJSON()
      .replace('T', '_')
      .replace(':', '')
      .replace(':', '')
      .replace('.', '')
      .substr(0, 17);
    const dir = this.config.deployTo;

    let backupsStr = await shipit[this.config.command](`ls ${dir}/backups`);
    if (backupsStr[0]) backupsStr = backupsStr[0]; // if remote it will be array, so lets convert it :)
    const backups = backupsStr.stdout
      .split('\n')
      .filter(v => !!v)
      .reverse();

    let databasesStr = await shipit[this.config.command](`ls ${dir}/databases`);
    if (databasesStr[0]) databasesStr = databasesStr[0];
    const databases = databasesStr.stdout.split('\n').filter(v => !!v);
    databases.unshift('smdb_' + env);

    const inputs = await inquirer.prompt([
      {
        type: 'list',
        name: 'file',
        message: 'Select BACKUP FILE to restore backup from',
        choices: backups,
        default: backups[0],
      },
      {
        type: 'list',
        name: 'db',
        message: 'Select DATABASE to restore to',
        choices: databases,
        default: databases[0],
      },
    ]);
    if (!inputs.file) {
      console.log('NO FILE SELECTED');
      return;
    }
    if (!inputs.db) {
      console.log('NO DB SELECTED');
      return;
    }

    // stop server
    await shipit[this.config.command](`pm2 stop ${dir}/pm2.json`);

    const restoreToDir = `${dir}/databases/${inputs.db}`
    const restoreFromFile = `${dir}/backups/${inputs.file}`

    // ensure dir exists
    await shipit[this.config.command](
      `mkdir -p ${restoreToDir}`,
    );

    // backup db directory, just in case
    await shipit[this.config.command](
      `mv ${restoreToDir} ${restoreToDir}_${date}`,
    );

    // unzip backup
    await shipit[this.config.command](
      `unzip ${restoreFromFile} -d ${restoreToDir}`,
    );

    // official backup restore
    // await shipit.local(`${dir}/current/bin/console.sh "CONNECT plocal:${dir}/current/databases/smdb_dev admin root; RESTORE DATABASE ${dir}/backups/${inputs.file}"`);

    // start server
    await shipit[this.config.command](`cd ${dir} && pm2 startOrReload ./pm2.json`);
  });

  /**
   * Download backup from remote
   */
  shipit.task('download', async function() {
    const dir = this.config.deployTo;
    const env = this.environment;

    let backupsStr = await shipit.remote(`ls ${dir}/backups`);
    if (backupsStr[0]) backupsStr = backupsStr[0]; // if remote it will be array, so lets convert it :)
    const backups = backupsStr.stdout
      .split('\n')
      .filter(v => !!v)
      .reverse();

    const inputs = await inquirer.prompt([
      {
        type: 'list',
        name: 'file',
        message: `Select BACKUP FILE to download from ${env}`,
        choices: backups,
        default: backups[0],
      },
    ]);
    if (!inputs.file) {
      console.log('NO FILE SELECTED');
      return;
    }

    // download the file
    await shipit.remoteCopy(
      `${dir}/backups/${inputs.file}`,
      `${this.config.localDbDir}/backups/${inputs.file}`,
      {
        direction: 'remoteToLocal',
      },
    );
  });

  /**
   * PUSH backup to remote
   */
  shipit.task('upload', async function() {
    const dir = this.config.deployTo;
    const env = this.environment;

    let backupsStr = await shipit.local(`ls ${this.config.localDbDir}/backups`);
    const backups = backupsStr.stdout
      .split('\n')
      .filter(v => !!v)
      .reverse();

    const inputs = await inquirer.prompt([
      {
        type: 'list',
        name: 'file',
        message: `Select BACKUP FILE to UPLOAD to ${env} env`,
        choices: backups,
        default: backups[0],
      },
    ]);

    if (!inputs.file) {
      console.log('NO FILE SELECTED');
      return;
    }

    // download the file
    await shipit.remoteCopy(
      `${this.config.localDbDir}/backups/${inputs.file}`,
      `${dir}/backups/${inputs.file}`,
    );
  });
};
