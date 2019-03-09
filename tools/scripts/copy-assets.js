const {resolve} = require('path');
const sh = require('shelljs');

const BASE_DIR = process.cwd();

console.log('Copy:', 'package.json');
sh.cp('-f', resolve(BASE_DIR, 'package.json'), resolve(BASE_DIR, 'dist/package.json'))

console.log('Copy:', 'package-lock.json');
sh.cp('-f', resolve(BASE_DIR, 'package-lock.json'), resolve(BASE_DIR, 'dist/package-lock.json'))

console.log('Copy:', 'CHANGELOG.md');
sh.cp('-f', resolve(BASE_DIR, 'CHANGELOG.md'), resolve(BASE_DIR, 'dist/CHANGELOG.md'))
