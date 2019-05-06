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
  ENV: Env;
  BASE_DIR: string;
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
  let BASE_DIR;
  if (env === Env.DEV) {
    BASE_DIR = resolve(__dirname, '../../../../');
  } else {
    BASE_DIR = process.env[`SM_${env.toUpperCase()}_DIR`];
  }
  if (!BASE_DIR) {
    throwError(
      `process.env.SM_${env.toUpperCase()}_DIR - this env variable has to be defined`,
    );
  }
  if (!await pathExists(BASE_DIR)) {
    throwError(
      `BASE_DIR: "${BASE_DIR}" does not exist`,
    );
  }

  console.log(chalk.green('?'), message, chalk.blue(env), 'on', BASE_DIR);

  return {
    ENV: env,
    BASE_DIR,
  };
};
