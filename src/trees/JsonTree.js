import DefaultTree from './DefaultTree';

class JsonTree extends DefaultTree {
  toString() {
    return JSON.stringify(this.nodes, null, 4);
  }
}

export default JsonTree;
