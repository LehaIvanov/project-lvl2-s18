import _ from 'lodash';
import makeTree from './tree';

const getMarginLeftStr = depthValue => '    '.repeat(depthValue);

const nodeValueObjectToString = (valueObj, depth) => {
  const marginLeftStr = getMarginLeftStr(depth);
  const str = Object.keys(valueObj).reduce((acc, key) => {
    if (_.isObject(valueObj[key])) {
      return `${acc}${marginLeftStr}    ${key}: ` +
        `${nodeValueObjectToString(valueObj[key], depth + 1)}\n`;
    }

    return `${acc}${marginLeftStr}    ${key}: ${valueObj[key]}\n`;
  }, '{\n');

  return `${str}${marginLeftStr}}`;
};

const treeToString = (tree, depth) => {
  const marginLeftStr = getMarginLeftStr(depth);

  const nodeToString = (node) => {
    if (node.childs.length > 0) {
      return `${marginLeftStr}    ${node.key}: ${treeToString(node.childs, depth + 1)}\n`;
    }

    const newValue = _.isObject(node.newValue)
      ? nodeValueObjectToString(node.newValue, depth + 1) : node.newValue;
    const oldValue = _.isObject(node.oldValue)
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

const gendiffDefault = (before, after) => {
  const tree = makeTree(before, after);

  return treeToString(tree, 0);
};

export default gendiffDefault;
