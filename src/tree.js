import _ from 'lodash';

const isObject = value => value instanceof Object;

export const makeTree = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));

  return keys.map((key) => {
    if (isObject(before[key]) && isObject(after[key])) {
      return {
        key,
        oldValue: before[key],
        newValue: after[key],
        childs: makeTree(before[key], after[key]),
      };
    }

    return {
      key,
      oldValue: before[key],
      newValue: after[key],
      childs: null,
    };
  });
};

const getMarginLeft = depthValue => ' '.repeat(depthValue);

/*
if (after[key] === before[key]) {
      return `    ${key}: ${before[key]}\n`;
    } else if (typeof after[key] === 'undefined') {
      return `  - ${key}: ${before[key]}\n`;
    } else if (typeof before[key] === 'undefined') {
      return `  + ${key}: ${after[key]}\n`;
    }
    return `  + ${key}: ${after[key]}\n  - ${key}: ${before[key]}\n`;
*/

export const printTree = (tree) => {
  const iter = (t, depth) => {
    const getLine = (n) => {
      if (n.childs) {
        return `${iter(n.childs, depth + 1)}`;
      }

      if (n.newValue === n.oldValue) {
        return `    ${n.key}: ${n.oldValue}\n`;
      } else if (typeof n.newValue === 'undefined') {
        return `  - ${n.key}: ${n.oldValue}\n`;
      } else if (typeof n.oldValue === 'undefined') {
        return `  + ${n.key}: ${n.newValue}\n`;
      }

      return `  + ${n.key}: ${n.newValue}\n  - ${n.key}: ${n.oldValue}\n`;
    };

    const lines = t.reduce((acc, node) => `${acc}${getLine(node)}`, '');

    return `{\n${lines}}`;
  };

  return iter(tree, 0);
};
