import fs from 'fs';
import gendiff from '../src/';

const resourcesPath = './__tests__/resources';
const fixturesPath = './__tests__/resources/fixtures';

test('gendiff flat json', () => {
  const path1 = `${resourcesPath}/before.json`;
  const path2 = `${resourcesPath}/after.json`;
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

test('gendiff flat yaml', () => {
  const path1 = `${resourcesPath}/before.yml`;
  const path2 = `${resourcesPath}/after.yml`;
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

test('gendiff flat ini', () => {
  const path1 = `${resourcesPath}/before.ini`;
  const path2 = `${resourcesPath}/after.ini`;
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

test('gendiff nested json', () => {
  const path1 = `${resourcesPath}/before-nested.json`;
  const path2 = `${resourcesPath}/after-nested.json`;
  const expected = fs.readFileSync(`${fixturesPath}/expected-nested.txt`, 'utf8');
  const result = gendiff(path1, path2);

  expect(result).toEqual(expected);
});
