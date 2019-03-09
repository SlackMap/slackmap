const ora = require('ora');

const spinner = ora('Loading stats...').start();

setTimeout(() => {
  spinner.color = 'yellow';
  spinner.text = 'Rendering';
}, 1000);

setTimeout(() => {
  spinner.color = 'green';
  spinner.text = 'One more second';
}, 2000);

setTimeout(() => {
  spinner.color = 'green';
  spinner.succeed('Here are the stats');
}, 3000);
