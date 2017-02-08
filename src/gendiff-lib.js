import _ from 'lodash';

const gendiff = (before, after) => {
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

export default gendiff;
