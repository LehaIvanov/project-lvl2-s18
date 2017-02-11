import _ from 'lodash';

const isObject = value => value instanceof Object;

const isUndefined = value => typeof value === 'undefined';

export const makeTree = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));

  return keys.map((key) => {
    if (isObject(before[key]) && isObject(after[key])) {
      return {
        type: 'unchanged',
        key,
        oldValue: before[key],
        newValue: after[key],
        childs: makeTree(before[key], after[key]),
      };
    }

    if (isUndefined(before[key])) {
      return {
        type: 'new',
        key,
        newValue: after[key],
        childs: null,
      };
    }

    if (isUndefined(after[key])) {
      return {
        type: 'deleted',
        key,
        oldValue: before[key],
        childs: null,
      };
    }

    return {
      key,
      type: before[key] === after[key] ? 'unchanged' : 'changed',
      oldValue: before[key],
      newValue: after[key],
      childs: null,
    };
  });
};

const getMarginLeftStr = depthValue => '    '.repeat(depthValue);

const nodeValueObjectToString = (valueObj, depth) => {
  const marginLeftStr = getMarginLeftStr(depth);
  const str = Object.keys(valueObj).reduce((acc, key) => {
    if (isObject(valueObj[key])) {
      return `${acc}${marginLeftStr}    ${key}: ` +
        `${nodeValueObjectToString(valueObj[key], depth + 1)}\n`;
    }

    return `${acc}${marginLeftStr}    ${key}: ${valueObj[key]}\n`;
  }, '{\n');

  return `${str}${marginLeftStr}}`;
};

const treeToStringIter = (tree, depth) => {
  const marginLeftStr = getMarginLeftStr(depth);

  const nodeToString = (node) => {
    if (node.childs) {
      return `${marginLeftStr}    ${node.key}: ${treeToStringIter(node.childs, depth + 1)}\n`;
    }

    const newValue = isObject(node.newValue)
      ? nodeValueObjectToString(node.newValue, depth + 1) : node.newValue;
    const oldValue = isObject(node.oldValue)
      ? nodeValueObjectToString(node.oldValue, depth + 1) : node.oldValue;

    if (node.type === 'changed') {
      return `${marginLeftStr}  + ${node.key}: ${newValue}\n` +
        `${marginLeftStr}  - ${node.key}: ${oldValue}\n`;
    }

    if (node.type === 'unchanged') {
      return `${marginLeftStr}    ${node.key}: ${oldValue}\n`;
    }

    if (node.type === 'new') {
      return `${marginLeftStr}  + ${node.key}: ${newValue}\n`;
    }

    if (node.type === 'deleted') {
      return `${marginLeftStr}  - ${node.key}: ${oldValue}\n`;
    }

    return '';
  };

  const lines = tree.reduce((acc, currNode) => `${acc}${nodeToString(currNode)}`, '');

  return `{\n${lines}${marginLeftStr}}`;
};

export const treeToString = tree => treeToStringIter(tree, 0);
