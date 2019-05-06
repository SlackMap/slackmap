const { readdirSync, statSync } = require('fs');
const { join } = require('path');

export function listDirs(dir: string): string[] {
  return readdirSync(dir).filter(f => statSync(join(dir, f)).isDirectory());
};
