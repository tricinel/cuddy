import group from '../group';
import posts from '../../__mocks__/posts';

test('Performs a group', () => {
  expect(group('genre')(posts)).toEqual({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Comedy: [...posts.slice(0, 2)],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Horror: [posts[2]]
  });
});
