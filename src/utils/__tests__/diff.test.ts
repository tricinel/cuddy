import { includes } from 'ramda';
import { keyDiff, valueDiffInList, diff } from '../diff';

test('Creates a list of all the keys that exist in the source and not the target', () => {
  expect(keyDiff(['foo', 'baz'], { foo: 'bar' })).toEqual([]);
  expect(keyDiff(['foo', 'baz'], { bar: 'bar' })).toEqual(['bar']);
  expect(keyDiff(['baz'], { foo: 1, bar: '2' })).toEqual(['foo', 'bar']);
  expect(keyDiff(['baz'], { eq: { foo: 'bar' }, gt: { foo: 'baz' } })).toEqual([
    'foo'
  ]);
  expect(keyDiff(['baz'], { match: { eq: { foo: 'bar' } } })).toEqual(['foo']);
});

test('Creates a list of all the keys that exist in the source and not the target, going deep', () => {
  const obj = {
    check: {
      all: {
        the: {
          props: {
            going: {
              very: {
                deep: {
                  foo: 'bar',
                  bar: 'foo'
                }
              }
            }
          }
        }
      }
    }
  };

  expect(keyDiff(['baz'], obj)).toEqual(['foo', 'bar']);
  expect(keyDiff(['foo', 'bar', 'baz'], obj)).toEqual([]);
});

test('Creates a list of all the values in the list that are not of the required type', () => {
  expect(valueDiffInList([1, 2, 'a'], 'Number')).toEqual({ '2': 'a' });
  expect(valueDiffInList([1, 2, 'a'], 'String')).toEqual({ '0': 1, '1': 2 });
  expect(valueDiffInList([1, 2, 'a', 1], 'String')).toEqual({
    '0': 1,
    '1': 2,
    '3': 1
  });
  expect(valueDiffInList([1, () => {}], 'Function')).toEqual({ '0': 1 });
  expect(valueDiffInList([1, () => {}], 'Number')).toMatchInlineSnapshot(`
    Object {
      "1": [Function],
    }
  `);
});

test('Creates a list of all the values that do not match the target', () => {
  const allowed = ['bar'];
  const notIncludes = (_key: string, val: string): boolean =>
    !includes(val, allowed);
  expect(diff(notIncludes, { foo: 'bar' })).toEqual({});
  expect(diff(notIncludes, { foo: 'baz' })).toEqual({ foo: 'baz' });
  expect(
    diff(notIncludes, {
      fam: 'foo',
      foo: { baz: { fii: 'baz', faa: 'boo', foo: 'bar' } }
    })
  ).toEqual({ fam: 'foo', fii: 'baz', faa: 'boo' });
});

test('Creates a list of all the values that do not match the target', () => {
  const allowed = ['bar'];
  const notIncludes = (_key: string, val: string): boolean =>
    !includes(val, allowed);
  const isntFunction = (_key: string, val: unknown): boolean =>
    typeof val !== 'function';
  expect(diff(notIncludes, { foo: 'bar' })).toEqual({});
  expect(diff(notIncludes, { foo: 'baz' })).toEqual({ foo: 'baz' });
  expect(
    diff(notIncludes, {
      fam: 'foo',
      foo: { baz: { fii: 'baz', faa: 'boo', foo: 'bar' } }
    })
  ).toEqual({ fam: 'foo', fii: 'baz', faa: 'boo' });
  // eslint-disable-next-line object-shorthand
  const noop = (): void => {};
  expect(diff(isntFunction, { foo: noop })).toEqual({});
  expect(diff(isntFunction, { foo: noop, bar: 'baz' })).toEqual({
    bar: 'baz'
  });
});
