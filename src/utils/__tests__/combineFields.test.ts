import combineFields from '../combineFields';

test('Combine all fields into a flat array without any undefined', () => {
  expect(combineFields(['a', 'b'], ['c', 'd'])).toEqual(['a', 'b', 'c', 'd']);
  expect(combineFields(['a', 'b'], ['a', 'd'])).toEqual(['a', 'b', 'd']);
  expect(combineFields(['a', 'b'])).toEqual(['a', 'b']);
  // @ts-expect-error undefined shouldn't be there
  expect(combineFields(['a', 'b'], ['c', 'd'], undefined)).toEqual([
    'a',
    'b',
    'c',
    'd'
  ]);
});
