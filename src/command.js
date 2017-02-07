import program from 'commander';
import pjson from '../package.json';

const createCommand = () => program
  .version(pjson.version)
  .usage('[options] <first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

const runCommand = (argv) => {
  createCommand().parse(argv);
};

export default runCommand;
