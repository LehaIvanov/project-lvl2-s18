const treeToObj = (tree) => {
  const nodeToObj = node => ({
    type: node.type,
    oldValue: node.oldValue,
    newValue: node.newValue,
    childs: node.childs.length > 0 ? treeToObj(node.childs) : undefined,
  });

  return tree.reduce((acc, currNode) => ({ ...acc, [currNode.key]: nodeToObj(currNode) }),
    {});
};

const treeToString = tree => JSON.stringify(treeToObj(tree), null, 2);

const gendiffJson = tree => treeToString(tree);

export default gendiffJson;
