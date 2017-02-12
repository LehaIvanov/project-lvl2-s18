import _ from 'lodash';

const makeTree = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));

  return keys.map((key) => {
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return {
        type: 'unchanged',
        key,
        childs: makeTree(before[key], after[key]),
      };
    }

    if (_.isUndefined(before[key])) {
      return {
        type: 'new',
        key,
        newValue: after[key],
        childs: [],
      };
    }

    if (_.isUndefined(after[key])) {
      return {
        type: 'deleted',
        key,
        oldValue: before[key],
        childs: [],
      };
    }

    return {
      type: before[key] === after[key] ? 'unchanged' : 'changed',
      key,
      oldValue: before[key],
      newValue: after[key],
      childs: [],
    };
  });
};

export default makeTree;
