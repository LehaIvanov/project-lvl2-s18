import _ from 'lodash';
import makeTree from './tree';

const nodeValueToString = (value) => {
  if (_.isObject(value)) {
    return 'complex value';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return String(value);
};

const treeToString = (tree, parents) => {
  const nodeToString = (node) => {
    if (node.childs.length > 0) {
      return treeToString(node.childs, `${parents}${node.key}.`);
    }

    const newValue = nodeValueToString(node.newValue);
    const oldValue = nodeValueToString(node.oldValue);

    if (node.type === 'changed') {
      return `Property '${parents}${node.key}' was updated. From ${oldValue} to ${newValue}\n`;
    }

    if (node.type === 'new') {
      if (_.isObject(node.newValue)) {
        return `Property '${parents}${node.key}' was added with ${newValue}\n`;
      }

      return `Property '${parents}${node.key}' was added with value: ${newValue}\n`;
    }

    if (node.type === 'deleted') {
      return `Property '${parents}${node.key}' was removed\n`;
    }

    return '';
  };

  return tree.reduce((acc, currNode) => `${acc}${nodeToString(currNode)}`, '');
};

const gendiffPlain = (before, after) => {
  const tree = makeTree(before, after);

  return treeToString(tree, '');
};

export default gendiffPlain;
