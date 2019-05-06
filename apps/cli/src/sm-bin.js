#!/bin/usr/env node

const { resolve } = require('path');
const project = resolve(__dirname, '../tsconfig.json');
console.log('PROJECT', project);

require('ts-node').register({
  project
});
require('./sm.ts');
