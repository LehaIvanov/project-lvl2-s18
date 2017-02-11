import DefaultTree from './trees/DefaultTree';
import PlainTree from './trees/PlainTree';

const buildTree = (obj1, obj2, format) => {
  const C = format === 'plain' ? PlainTree : DefaultTree;
  return new C(obj1, obj2);
};

export default buildTree;
