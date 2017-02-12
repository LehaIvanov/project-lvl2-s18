import fs from 'fs';
import path from 'path';
import parseObj from './parser';
import getGendiffStrategy from './gendiffStrategy';
import makeTree from './tree';

const getObj = (pathToFile) => {
  const extname = path.extname(pathToFile);
  const content = fs.readFileSync(pathToFile, 'utf8');

  return parseObj(content, extname);
};

const gendiff = (path1, path2, format = 'default') => {
  const obj1 = getObj(path1);
  const obj2 = getObj(path2);

  if (obj1 && obj2) {
    const generatorFunc = getGendiffStrategy(format);
    return generatorFunc(makeTree(obj1, obj2));
  }

  return 'Unexpected extension of files';
};

export default gendiff;
