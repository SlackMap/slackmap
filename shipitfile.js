const sh = require('shelljs');
const host = process.env.SSH_HOST;
const user = process.env.SSH_USER;
const {resolve} = require('path');

const BASE_DIR = process.cwd();


module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('./tools/scripts/shipit-update').default(shipit);

shipit.initConfig({
  default: {
    workspace: resolve(BASE_DIR, 'dist'),
    keepReleases: 3,
    deleteOnRollback: true
  },
  test: {
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
  'copy:assets',
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
shipit.blTask('copy:assets', async function () {
  sh.ls(BASE_DIR);
  console.log('LS CWD', sh.ls(BASE_DIR));
  console.log('LS .', sh.ls('.'));

  sh.cp('-f', resolve(BASE_DIR, 'package.json'), resolve(BASE_DIR, 'dist/package.json'))
  sh.cp('-f', resolve(BASE_DIR, 'package-lock.json'), resolve(BASE_DIR, 'dist/package-lock.json'))
  sh.cp('-f', resolve(BASE_DIR, 'CHANGELOG.md'), resolve(BASE_DIR, 'dist/CHANGELOG.md'))
});

/**
 * run npm ci
 */
shipit.blTask('npm:install', async function () {
  await shipit.remote(`cd ${shipit.releasePath} && npm install --production`);
});

/**
 * reload pm2 processes
 */
shipit.blTask('pm2:reload', async function () {
  await shipit.remote(`pm2 startOrGracefulReload ${this.config.deployTo}/pm2.json`);
});

};
