import program from 'commander';
import pjson from '../package.json';
import { gendiffJson, gendiffYaml, gendiffIni } from './';

const isJson = path => path.endsWith('.json');

const isYaml = path => path.endsWith('.yaml') || path.endsWith('.yml');

const isIni = path => path.endsWith('.ini');

const createCommand = () => program
  .version(pjson.version)
  .arguments('<first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((path1, path2) => {
    if (isJson(path1) && isJson(path2)) {
      console.log(gendiffJson(path1, path2));
    } else if (isYaml(path1) && isYaml(path2)) {
      console.log(gendiffYaml(path1, path2));
    } else if (isIni(path1) && isIni(path2)) {
      console.log(gendiffIni(path1, path2));
    } else {
      console.error('Unexpected extension of files');
      process.exit(1);
    }
  });

const runCommand = (argv) => {
  createCommand().parse(argv);
};

export default runCommand;
