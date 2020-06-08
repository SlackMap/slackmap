/**
 * @params shipit instance
 * @param options {name: 'deploy-dir'} pass custom name if you want to avoid overwriting default deploy tasks
 */
module.exports = function(shipit, options) {
  if (!options) {
    options = {};
  }
  const name = options.name || 'deploy';

  /**
   * overwrite default task, default task will work only with git (yes, there is still bug)
   */
  shipit.task(name + ':fetch', async function() {
    // configure workspace
    shipit.workspace = shipit.config.workspace;
    console.log('Set workspace path to:', shipit.workspace);
    shipit.emit('fetched');
  });
};
