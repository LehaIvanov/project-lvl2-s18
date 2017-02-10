import _ from 'lodash';
import parseObj from './parser';

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

const gendiff = (path1, path2) => {
  const obj1 = parseObj(path1);
  const obj2 = parseObj(path2);

  if (obj1 && obj2) {
    return gendiffObj(obj1, obj2);
  }

  return 'Unexpected extension of files';
};

export default gendiff;
