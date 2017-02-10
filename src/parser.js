import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parseObjFromFile = (pathToFile) => {
  const extname = path.extname(pathToFile);
  const content = fs.readFileSync(pathToFile, 'utf8');

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
