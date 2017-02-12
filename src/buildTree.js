import DefaultTree from './trees/DefaultTree';
import PlainTree from './trees/PlainTree';
import JsonTree from './trees/JsonTree';

const getClass = (format) => {
  switch (format) {
    case 'plain': {
      return PlainTree;
    }
    case 'json': {
      return JsonTree;
    }
    default: {
      return DefaultTree;
    }
  }
};

const buildTree = (obj1, obj2, format) => {
  const C = getClass(format);
  return new C(obj1, obj2);
};

export default buildTree;
