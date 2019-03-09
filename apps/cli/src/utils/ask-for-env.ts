
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const {throwError} = require('./throw-error')

module.exports.askForEnv = async function (env) {


  let message = 'environement forced to'
  if(!env) {
    const inputs = await inquirer.prompt([{
      type: 'list',
      name: 'env',
      default: 'dev',
      message: 'select environment',
      choices: ['dev', 'test', 'prod']
    }]);
    env = inputs.env;
    message = 'environement selected to:';
  }

  const BASE_DIR = process.env[`SM_${env.toUpperCase()}_DIR`];
  if(!BASE_DIR) {
    throwError(`process.env.SM_${env.toUpperCase()}_DIR - this env variable has to be defined`)
  }

  console.log(chalk.green('?'), message, chalk.blue(env), 'on', BASE_DIR);

  return {
    ENV: env,
    BASE_DIR
  };
}