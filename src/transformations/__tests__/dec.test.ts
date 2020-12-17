import decrement from '../dec';
import posts from '../../__mocks__/posts';

test('Decrements values', () => {
  const results = decrement({ count: 2 })(posts);
  const valuesAfter = results.map(({ count }) => count);

  expect(valuesAfter).toEqual([0, 0, 3]);
});
