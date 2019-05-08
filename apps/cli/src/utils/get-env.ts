import { resolve } from "path";
import { throwError } from "./throw-error";
import { pathExists } from "fs-extra";
const inquirer = require('inquirer');
const chalk = require('chalk');

export enum Env {
  PROD = 'prod',
  DEV = 'dev',
  TEST = 'test'
}

export interface EnvResponse {
  env: Env;
  baseDir: string;
  dbDir: string
}

export async function getEnv(env?: Env): Promise<EnvResponse> {

  let message = 'environnement forced to';
  // if env is not provided, ask for it
  if (!env) {
    const inputs = await inquirer.prompt([
      {
        type: 'list',
        name: 'env',
        default: Env.TEST,
        message: 'select environment',
        choices: [Env.DEV, Env.TEST, Env.PROD],
      },
    ]);
    env = inputs.env;
    message = 'environement selected to:';
  }

  // figure out the base_dir
  let baseDir, dbDir;
  if (env === Env.DEV) {
    baseDir = resolve(__dirname, '../../../../');
    dbDir = resolve(baseDir, 'apps/db');
    if (!await pathExists(dbDir)) {
      throwError(
        `dbDir: "${dbDir}" does not exist`,
      );
    }
  } else {
    baseDir = process.env[`SM_${env.toUpperCase()}_DIR`];
  }
  if (!baseDir) {
    throwError(
      `process.env.SM_${env.toUpperCase()}_DIR - this env variable has to be defined`,
    );
  }
  if (!await pathExists(baseDir)) {
    throwError(
      `baseDir: "${baseDir}" does not exist`,
    );
  }

  console.log(chalk.green('?'), message, chalk.green(env), 'on baseDir', chalk.green(baseDir));

  return {
    env: env,
    baseDir: baseDir,
    dbDir
  };
};
