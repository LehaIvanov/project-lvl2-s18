import { gendiffJson, gendiffYaml, gendiffIni } from '../src/';

test('gendiffJson', () => {
  const path1 = './__tests__/resources/before.json';
  const path2 = './__tests__/resources/after.json';
  const expected = ['{\n',
    '    host: hexlet.io\n',
    '  + timeout: 20\n',
    '  - timeout: 50\n',
    '  - proxy: 123.234.53.22\n',
    '  + verbose: true\n',
    '}',
  ].join('');

  expect(gendiffJson(path1, path2)).toEqual(expected);
});

test('gendiffYaml', () => {
  const path1 = './__tests__/resources/before.yml';
  const path2 = './__tests__/resources/after.yml';
  const expected = ['{\n',
    '    host: hexlet.io\n',
    '  + timeout: 20\n',
    '  - timeout: 50\n',
    '  - proxy: 123.234.53.22\n',
    '  + verbose: true\n',
    '}',
  ].join('');

  expect(gendiffYaml(path1, path2)).toEqual(expected);
});

test('gendiffIni', () => {
  const path1 = './__tests__/resources/before.ini';
  const path2 = './__tests__/resources/after.ini';
  const expected = ['{\n',
    '    host: hexlet.io\n',
    '  + timeout: 20\n',
    '  - timeout: 50\n',
    '  - proxy: 123.234.53.22\n',
    '  + verbose: true\n',
    '}',
  ].join('');

  expect(gendiffIni(path1, path2)).toEqual(expected);
});
