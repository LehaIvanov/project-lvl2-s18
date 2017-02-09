import gendiff from '../src/gendiff-lib';

test('gendiff', () => {
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

  expect(gendiff(path1, path2)).toEqual(expected);
});
