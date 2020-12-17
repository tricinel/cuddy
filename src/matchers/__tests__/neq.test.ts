import neq from '../neq';
import posts from '../../__mocks__/posts';

test('Matches for inequality', () => {
  const matchOne = neq({ title: 'One' })(posts);
  expect(matchOne).toEqual([posts[1], posts[2]]);

  const matchAll = neq({ title: 'abc' })(posts);
  expect(matchAll).toEqual(posts);
});
