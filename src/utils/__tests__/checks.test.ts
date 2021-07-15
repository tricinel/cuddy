import {
  checkForNumbersOnly,
  checkKeys,
  checkForFunctionsOnly
} from '../checks';

test('Contains only numbers as values', () => {
  const valid = { foo: 1, bar: 2, deep: { nested: 3 } };
  expect(checkForNumbersOnly('check', valid)).toEqual([]);

  const invalid = { foo: 'bar', bar: 'baz', deep: { nested: 'fii' } };
  expect(checkForNumbersOnly('check', invalid)).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'check.foo' should be a 'Number'. You passed 'bar'.",
      },
      Object {
        "level": "error",
        "message": "'check.bar' should be a 'Number'. You passed 'baz'.",
      },
      Object {
        "level": "error",
        "message": "'check.nested' should be a 'Number'. You passed 'fii'.",
      },
    ]
  `);
});

test('Contains only functions as values', () => {
  const noop = (): void => {};
  const valid = { foo: noop, bar: noop };
  expect(checkForFunctionsOnly('check', valid)).toEqual([]);

  const invalid = { foo: 'bar', bar: 'baz' };
  expect(checkForFunctionsOnly('check', invalid)).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'check.foo' should be a 'Function'. You passed 'bar'.",
      },
      Object {
        "level": "error",
        "message": "'check.bar' should be a 'Function'. You passed 'baz'.",
      },
    ]
  `);
});

test('Contains only the correct keys', () => {
  const itemKeys = ['title', 'author'];

  const valid = { foo: { title: 'One' }, author: 'Me' };
  expect(checkKeys('check', valid, itemKeys)).toEqual([]);

  const invalid = { foo: { title: 'One', bar: 'baz' }, boo: 'Me' };
  expect(checkKeys('check', invalid, itemKeys)).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "warn",
        "message": "'check.foo.bar' may not exist on the items in your collection.",
      },
      Object {
        "level": "warn",
        "message": "'check.boo' may not exist on the items in your collection.",
      },
    ]
  `);
});
