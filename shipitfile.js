module.exports = function (shipit) {

  require('./tools/shipit-deploy')(shipit);

  const host = process.env.SSH_HOST;
  const user = process.env.SSH_USER;
  if(!host || !user) throw new Error('SSH_HOST & SSH_USER env variables has to be set in your system')

  shipit.initConfig({
    default: {
      workspace: './dist',
      keepReleases: 10,
      deleteOnRollback: false,
      copy: '-rf',
      rsync: '--del',
      ignores: ['node_modules']
    },
    next: {
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
    // symlink .env to api app folder
    const deployTo = this.config.deployTo;
    const releaseDir = `${this.releasePath}`;
    await shipit.remote(`ln -s ${deployTo}/.env ${releaseDir}/apps/api/.env`);
    await shipit.remote(`ln -s ${deployTo}/.env ${releaseDir}/apps/web/server/.env`);

    // npm install
    await shipit.remote(`cd ${shipit.releasePath} && npm install --production`);
  })

  /**
   * reload pm2 processes after successful deployment
   */
  shipit.on('deployed', () => shipit.start('pm2:reload'));

  shipit.blTask('pm2:reload', async function () {
    const deployTo = this.config.deployTo;
    await shipit.remote(`pm2 startOrGracefulReload ${deployTo}/pm2.json`);
  });

  shipit.blTask('rollback', [
    'rollback:init',
    'deploy:publish',
    'deploy:clean',
    'rollback:finish',
    'pm2:reload',
  ])

  // currentPath: '/home/[user]/test/current',
  // releasesPath: '/home/[user]/test/releases',
  // workspace: './dist',
  // previousRelease: '20190310213226',
  // releaseDirname: '20190312085435',
  // releasePath: '/home/[user]/test/releases/20190312085435'

};
