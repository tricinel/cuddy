import gt from '../gt';
import posts from '../../__mocks__/posts';

test('Matches for greather than', () => {
  const match = gt({ count: 2 })(posts);
  expect(match).toEqual([posts[2]]);

  const noMatch = gt({ count: 10 })(posts);
  expect(noMatch).toEqual([]);
});

test('Ignores the filter when it is empty', () => {
  const match = gt({})(posts);
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
  const match = gt(props);
  expect(match([])).toEqual([]);
});
