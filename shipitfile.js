module.exports = function (shipit) {

  require('./tools/shipit-deploy')(shipit);

  const host = process.env.SSH_HOST;
  const user = process.env.SSH_USER;

  shipit.initConfig({
    default: {
      workspace: './dist',
      keepReleases: 5,
      deleteOnRollback: false
    },
    test: {
      deployTo: `/home/${user}/test`,
      servers: `${user}@${host}`
    },
    prod: {
      deployTo: `/home/${user}/prod`,
      servers: {host,user}
    }
  });

  /**
   * run npm install after uploading files
   */
  shipit.on('updated', shipit.start('npm:install'));

  shipit.blTask('npm:install', async function() {
    console.time('npm:install')
    await shipit.remote(`cd ${shipit.releasePath} && npm install --production`);
    console.timeEnd('npm:install')
  })

  /**
   * reload pm2 processes after successful deployment
   */
  shipit.on('deployed', shipit.start('pm2:reload'));

  shipit.blTask('pm2:reload', async function () {
    await shipit.remote(`pm2 startOrGracefulReload ${this.config.deployTo}/pm2.json`);
  });

};
