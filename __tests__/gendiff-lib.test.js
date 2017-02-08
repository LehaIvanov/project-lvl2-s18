import gendiff from '../src/gendiff-lib';

test('gendiff', () => {
  const before = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
  };
  const after = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  const expected = ['{\n',
    '    host: hexlet.io\n',
    '  + timeout: 20\n',
    '  - timeout: 50\n',
    '  - proxy: 123.234.53.22\n',
    '  + verbose: true\n',
    '}',
  ].join('');

  expect(gendiff(before, after)).toEqual(expected);
});

test('gendiff(<empty obj>, <empty obj>)', () => {
  const before = {};
  const after = {};
  const expected = '{\n}';

  expect(gendiff(before, after)).toEqual(expected);
});
