const { readdirSync, statSync } = require('fs');
const { join } = require('path');

module.exports.listDirs = function(dir) {
  return readdirSync(dir).filter(f => statSync(join(dir, f)).isDirectory());
};
