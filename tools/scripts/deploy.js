// const host = process.env.SSH_HOST;
// const user = process.env.SSH_USER;
// const Shipit = require('shipit-cli');

// const shipit = new Shipit({
//   environment: 'test'
// })

// require('shipit-deploy')(shipit);

// shipit.initConfig({
//   default: {
//     workspace: './dist',
//     keepReleases: 10,
//     deleteOnRollback: true
//   },
//   test: {
//     workspace: './dist',
//     deployTo: `/home/${user}/test`,
//     servers: `${user}@${host}`
//   },
//   prod: {
//     deployTo: `/home/${user}/prod`,
//     servers: [{host,user}]
//   }
// });

// shipit.task('deploy2', [
//   'deploy:update',
//   'npm:ci',
//   'deploy:publish',
//   'deploy:clean',
//   'pm2:reload',
// ]);

// /**
//  * run npm ci
//  */
// shipit.task('npm:ci', async function () {
//   await shipit.remote(`npm ci --only=production`);
// });

// /**
//  * reload pm2 processes
//  */
// shipit.task('pm2:reload', async function () {
//   await shipit.remote(`pm2 startOrGracefulReload ${this.config.deployTo}/pm2.json`);
// });

// shipit.initialize();
// shipit.on('task_err', () => exit(1));
// shipit.on('task_not_found', () => exit(1));
// shipit.start(['deploy2']);
