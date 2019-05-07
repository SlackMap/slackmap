const path = require('path');

module.exports = function (shipit) {

  require('./tools/shipit-deploy')(shipit);

  const host = process.env.SSH_HOST;
  const user = process.env.SSH_USER;

  shipit.initConfig({
    default: {
      workspace: path.resolve(__dirname, 'apps/db/current'),
      keepReleases: 5,
      deleteOnRollback: true,
      copy: '-rf',
      rsync: '--del',
      ignores: ['node_modules']
    },
    test: {
      deployTo: `/home/${user}/test/db`,
      servers: `${user}@${host}`
    },
    prod: {
      deployTo: `/home/${user}/prod/db`,
      servers: `${user}@${host}`
    }
  });

  /**
   * run npm install after uploading files
   */
  shipit.on('updated', () => shipit.start('symlinks'));

  shipit.blTask('symlinks', async function() {

    const deployTo = this.config.deployTo;
    const releaseDir = `${this.releasePath}`;

    // remove databases & config.xml
    await shipit.remote(`rm -Rf ${releaseDir}/databases`);
    await shipit.remote(`rm -Rf ${releaseDir}/config/orientdb-server-config.xml`);

    // symlink databases & config.xml
    await shipit.remote(`ln -s ${deployTo}/databases ${releaseDir}/databases`);
    await shipit.remote(`ln -s ${deployTo}/orientdb-server-config.xml ${releaseDir}/config/orientdb-server-config.xml`);

  })

  /**
   * reload pm2 processes after successful deployment
   */
  shipit.on('deployed', () => shipit.start('pm2:reload'));

  shipit.blTask('pm2:reload', async function () {
    await shipit.remote(`pm2 startOrGracefulReload ${this.config.deployTo}/pm2.json`);
  });

};
