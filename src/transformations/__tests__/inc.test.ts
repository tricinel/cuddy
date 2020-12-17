import increment from '../inc';
import posts from '../../__mocks__/posts';

test('Increments values', () => {
  const results = increment({ count: 2 })(posts);
  const valuesAfter = results.map(({ count }) => count);

  expect(valuesAfter).toEqual([4, 4, 7]);
});
