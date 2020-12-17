import isNotIn from '../nin';
import posts from '../../__mocks__/posts';

test('Matches for not inclusion', () => {
  const matchOne = isNotIn({ tags: 'c' })(posts);
  expect(matchOne).toEqual([posts[1], posts[2]]);

  const matchAll = isNotIn({ tags: 'abc' })(posts);
  expect(matchAll).toEqual(posts);

  const noMatch = isNotIn({ tags: 'y' })(posts);
  expect(noMatch).toEqual([]);
});

test('Ignores the filter when it is empty', () => {
  const match = isNotIn({})(posts);
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
  const match = isNotIn(props);
  expect(match([])).toEqual([]);
});
