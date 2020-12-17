import lte from '../lte';
import posts from '../../__mocks__/posts';

test('Matches for less than or equal', () => {
  const match = lte({ count: 2 })(posts);
  expect(match).toEqual([posts[0], posts[1]]);

  const matchAll = lte({ count: 5 })(posts);
  expect(matchAll).toEqual([...posts]);

  const noMatch = lte({ count: 1 })(posts);
  expect(noMatch).toEqual([]);
});

test('Ignores the filter when it is empty', () => {
  const match = lte({})(posts);
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
  const match = lte(props);
  expect(match([])).toEqual([]);
});
