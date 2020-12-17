import eq from '../eq';
import posts from '../../__mocks__/posts';

test('Matches for equality', () => {
  const match = eq({ title: 'One' })(posts);
  expect(match).toEqual([posts[0]]);

  const noMatch = eq({ title: 'abc' })(posts);
  expect(noMatch).toEqual([]);
});

test('Ignores the filter when it is empty', () => {
  const match = eq({})(posts);
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
  const match = eq(props);
  expect(match([])).toEqual([]);
});
