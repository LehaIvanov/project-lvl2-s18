import yaml from 'js-yaml';
import ini from 'ini';

const parseObjFromFile = (content, extname) => {
  switch (extname) {
    case '.json': {
      return JSON.parse(content);
    }
    case '.yaml':
    case '.yml': {
      return yaml.safeLoad(content);
    }
    case '.ini': {
      return ini.parse(content);
    }
    default: {
      return null;
    }
  }
};

export default parseObjFromFile;
