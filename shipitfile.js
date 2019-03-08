const sh = require('shelljs');
const host = process.env.SSH_HOST;
const user = process.env.SSH_USER;

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('./tools/scripts/shipit-update').default(shipit);

shipit.initConfig({
  default: {
    workspace: './dist',
    keepReleases: 3,
    deleteOnRollback: true
  },
  test: {
    branch: 'development',
    workspace: './dist',
    deployTo: `/home/${user}/test`,
    servers: `${user}@${host}`
  },
  prod: {
    deployTo: `/home/${user}/prod`,
    servers: [{host,user}]
  }
});

shipit.task('deploy', [
  'deploy:init',
  'deploy:fetch',
  'package.json',
  'deploy:update',
  'npm:install',
  'deploy:publish',
  'deploy:clean',
  'deploy:finish',
  'pm2:reload',
]);

/**
 * copy package.json
 */
shipit.blTask('package.json', async function () {
  await sh.cp('-f', './package.json', './dist/package.json')
  await sh.cp('-f', './package-lock.json', './dist/package-lock.json')
});

/**
 * run npm ci
 */
shipit.blTask('npm:install', async function () {
  await shipit.remote(`cd ${shipit.releasePath} && npm ci --only=production`);
});

/**
 * reload pm2 processes
 */
shipit.blTask('pm2:reload', async function () {
  await shipit.remote(`pm2 startOrGracefulReload ${this.config.deployTo}/pm2.json`);
});

};
