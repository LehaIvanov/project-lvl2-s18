import fs from 'fs';
import gendiff from '../src/';

const resourcesPath = './__tests__/resources';
const fixturesPath = './__tests__/resources/fixtures';
const extnameList = ['ini', 'json', 'yml'];

describe('gendiff for flat structure', () => {
  extnameList.forEach((extname) => {
    test(`*.${extname}`, () => {
      const path1 = `${resourcesPath}/before.${extname}`;
      const path2 = `${resourcesPath}/after.${extname}`;
      const expected = ['{\n',
        '    host: hexlet.io\n',
        '  + timeout: 20\n',
        '  - timeout: 50\n',
        '  - proxy: 123.234.53.22\n',
        '  + verbose: true\n',
        '}',
      ].join('');

      expect(gendiff(path1, path2)).toEqual(expected);
    });
  });
});

describe('gendiff for nested structure', () => {
  extnameList.forEach((extname) => {
    test(`*.${extname}`, () => {
      const path1 = `${resourcesPath}/nested/before.${extname}`;
      const path2 = `${resourcesPath}/nested/after.${extname}`;
      const expected = fs.readFileSync(`${fixturesPath}/expected-nested.txt`, 'utf8');

      expect(gendiff(path1, path2)).toEqual(expected);
    });
  });
});

describe('gendiff with plain format', () => {
  extnameList.forEach((extname) => {
    test(`*.${extname}`, () => {
      const path1 = `${resourcesPath}/nested/before.${extname}`;
      const path2 = `${resourcesPath}/nested/after.${extname}`;
      const expected = fs.readFileSync(`${fixturesPath}/expected-plain-format.txt`, 'utf8');
      const result = gendiff(path1, path2, 'plain');

      expect(result).toEqual(expected);
    });
  });
});

describe('gendiff with json format', () => {
  extnameList.forEach((extname) => {
    test(`*.${extname}`, () => {
      const path1 = `${resourcesPath}/nested/before.${extname}`;
      const path2 = `${resourcesPath}/nested/after.${extname}`;
      const expected = fs.readFileSync(`${fixturesPath}/expected-json-format.txt`, 'utf8');
      const result = gendiff(path1, path2, 'json');

      expect(result).toEqual(expected);
    });
  });
});
