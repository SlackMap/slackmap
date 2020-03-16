module.exports = function (shipit) {

  require('./tools/shipit-deploy')(shipit);

  const host = process.env.SSH_HOST;
  const user = process.env.SSH_USER;
  if(!host || !user) throw new Error('SSH_HOST & SSH_USER env variables has to be set in your system')

  shipit.initConfig({
    default: {
      workspace: './dist',
      keepReleases: 5,
      deleteOnRollback: true,
      copy: '-rf',
      rsync: '--del',
      ignores: ['node_modules']
    },
    test: {
      deployTo: `/home/${user}/test`,
      servers: `${user}@${host}`
    },
    prod: {
      deployTo: `/home/${user}/prod`,
      servers: `${user}@${host}`
    }
  });

  /**
   * run npm install after uploading files
   */
  shipit.on('updated', () => shipit.start('npm:install'));

  shipit.blTask('npm:install', async function() {
    await shipit.remote(`cd ${shipit.releasePath} && npm install --production`);
  })

  /**
   * reload pm2 processes after successful deployment
   */
  shipit.on('deployed', () => shipit.start('pm2:reload'));

  shipit.blTask('pm2:reload', async function () {
    await shipit.remote(`pm2 startOrGracefulReload ${this.config.deployTo}/pm2.json`);
  });

  // currentPath: '/home/[user]/test/current',
  // releasesPath: '/home/[user]/test/releases',
  // workspace: './dist',
  // previousRelease: '20190310213226',
  // releaseDirname: '20190312085435',
  // releasePath: '/home/[user]/test/releases/20190312085435'

};
