import gendiffDefault from './defaultStrategy';
import gendiffPlain from './plainStrategy';
import gendiffJson from './jsonStrategy';

const getGendiffStrategy = (format) => {
  switch (format) {
    case 'plain': {
      return gendiffPlain;
    }
    case 'json': {
      return gendiffJson;
    }
    default: {
      return gendiffDefault;
    }
  }
};

export default getGendiffStrategy;
