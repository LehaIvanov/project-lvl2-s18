import program from 'commander';
import pjson from '../package.json';
import gendiff from './';

const createCommand = () => program
  .version(pjson.version)
  .arguments('<first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((path1, path2) => (gendiff(path1, path2)));

export default createCommand;
