import isIn from '../in';
import posts from '../../__mocks__/posts';

test('Matches for inclusion in array list', () => {
  const matchOne = isIn({ tags: 'x' })(posts);
  expect(matchOne).toEqual([posts[1], posts[2]]);

  const matchAll = isIn({ tags: 'y' })(posts);
  expect(matchAll).toEqual(posts);

  const noMatch = isIn({ tags: 'abc' })(posts);
  expect(noMatch).toEqual([]);
});

test('Matches for inclusion in string', () => {
  const matchOne = isIn({ title: 'ne' })(posts);
  expect(matchOne).toEqual([posts[0]]);

  const matchTwo = isIn({ description: 'esc' })(posts);
  expect(matchTwo).toEqual(posts);

  const noMatch = isIn({ title: 'esc' })(posts);
  expect(noMatch).toEqual([]);
});

test('Ignores the filter when it is empty', () => {
  const match = isIn({})(posts);
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
  const match = isIn(props);
  expect(match([])).toEqual([]);
});
