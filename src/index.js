import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const gendiffObj = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  const getLine = (key) => {
    if (after[key] === before[key]) {
      return `    ${key}: ${before[key]}\n`;
    } else if (typeof after[key] === 'undefined') {
      return `  - ${key}: ${before[key]}\n`;
    } else if (typeof before[key] === 'undefined') {
      return `  + ${key}: ${after[key]}\n`;
    }
    return `  + ${key}: ${after[key]}\n  - ${key}: ${before[key]}\n`;
  };
  const lines = keys.reduce((acc, key) => `${acc}${getLine(key)}`, '');

  return `{\n${lines}}`;
};

const getObj = (pathToFile) => {
  const extname = path.extname(pathToFile);
  const content = fs.readFileSync(pathToFile, 'utf8');

  switch (extname) {
    case '.json': {
      return JSON.parse(content);
    }
    case '.yaml':
    case '.yml': {
      return yaml.safeLoad(content);
    }
    case '.ini': {
      return ini.parse(content);
    }
    default: {
      return null;
    }
  }
};

const gendiff = (path1, path2) => {
  const obj1 = getObj(path1);
  const obj2 = getObj(path2);

  if (obj1 && obj2) {
    return gendiffObj(obj1, obj2);
  }

  return 'Unexpected extension of files';
};

export default gendiff;