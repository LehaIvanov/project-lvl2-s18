import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';

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

export const gendiffJson = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));

  return gendiffObj(obj1, obj2);
};

export const gendiffYaml = (path1, path2) => {
  const obj1 = yaml.safeLoad(fs.readFileSync(path1, 'utf8'));
  const obj2 = yaml.safeLoad(fs.readFileSync(path2, 'utf8'));

  return gendiffObj(obj1, obj2);
};
