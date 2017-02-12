import DefaultTree from './DefaultTree';

class JsonTree extends DefaultTree {
  toString() {
    const treeToObj = (tree) => {
      const nodeToObj = node => ({
        type: node.type,
        oldValue: node.oldValue,
        newValue: node.newValue,
        childs: node.childs ? treeToObj(node.childs) : undefined,
      });

      return tree.reduce((acc, currNode) => ({ ...acc, [currNode.key]: nodeToObj(currNode) }),
        {});
    };

    return JSON.stringify(treeToObj(this.nodes), null, 2);
  }
}

export default JsonTree;
