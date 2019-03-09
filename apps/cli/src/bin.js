#!/usr/bin/env node
const {resolve} = require('path');
console.log('project', resolve(__dirname, '../tsconfig.json'));

require('ts-node').register({
  project: resolve(__dirname, '../tsconfig.json')
});
require('./sm');
