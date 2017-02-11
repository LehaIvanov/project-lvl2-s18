import DefaultTree from './DefaultTree';
import { isObject, isString } from '../helper';

class PlainTree extends DefaultTree {
  toString() {
    const nodeValueToString = (value) => {
      if (isObject(value)) {
        return 'complex value';
      }

      if (isString(value)) {
        return `'${value}'`;
      }

      return String(value);
    };

    const treeToStringIter = (tree, parents) => {
      const nodeToString = (node) => {
        if (node.childs) {
          return treeToStringIter(node.childs, `${parents}${node.key}.`);
        }

        const newValue = nodeValueToString(node.newValue);
        const oldValue = nodeValueToString(node.oldValue);

        if (node.type === 'changed') {
          return `Property '${parents}${node.key}' was updated. From ${oldValue} to ${newValue}\n`;
        }

        if (node.type === 'new') {
          if (isObject(node.newValue)) {
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

    return treeToStringIter(this.nodes, '');
  }
}

export default PlainTree;
