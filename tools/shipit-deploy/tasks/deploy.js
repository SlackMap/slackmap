/**
 * @params shipit instance
 * @param options {name: 'deploy-dir'} pass custom name if you want to avoid overwriting default deploy tasks
 */
module.exports = function(shipit, options) {
  if(!options) {
    options = {};
  }
  const name = options.name || 'deploy';
  require('shipit-deploy')(shipit);
  require('./fetch')(shipit, options);
  require('./update').default(shipit, options);

  /**
   * Orchestrate our own deploy task
   */
  shipit.task(name, [
    'deploy:init',
    `${name}:fetch`,
    `${name}:update`,
    'deploy:publish',
    'deploy:clean',
    'deploy:finish',
  ]);
};
