import gte from '../gte';
import posts from '../../__mocks__/posts';

test('Matches for greater than or equal', () => {
  const match = gte({ count: 5 })(posts);
  expect(match).toEqual([posts[2]]);

  const matchAll = gte({ count: 2 })(posts);
  expect(matchAll).toEqual([...posts]);

  const noMatch = gte({ count: 6 })(posts);
  expect(noMatch).toEqual([]);
});

test('Ignores the filter when it is empty', () => {
  const match = gte({})(posts);
  expect(match).toEqual(posts);
});

test.each([
  ['null', null],
  ['number', 42],
  ['string', 'foo'],
  ['array', []],
  ['undefined', undefined]
])('Ignores the wrong data types when it is %s', (_desc, props) => {
  // @ts-expect-error props should be an object of type Record<string, unknown>
  const match = gte(props);
  expect(match([])).toEqual([]);
});
