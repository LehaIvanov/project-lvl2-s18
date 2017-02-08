import program from 'commander';
import fs from 'fs';
import pjson from '../package.json';
import gendiff from './gendiff-lib';

const createCommand = () => program
  .version(pjson.version)
  .arguments('<first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((path1, path2) => {
    const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
    const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
    console.log(gendiff(obj1, obj2));
  });

const runCommand = (argv) => {
  createCommand().parse(argv);
};

export default runCommand;
