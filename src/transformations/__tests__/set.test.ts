import set from '../set';
import posts from '../../__mocks__/posts';
import type { BlogPost } from '../../__mocks__/posts';

test('Sets all props to a specific value', () => {
  const results: Partial<BlogPost>[] = set({ published: true })(posts);
  const valuesAfter = results.map(({ published }) => published);

  expect(valuesAfter).toEqual(Array(results.length).fill(true));
});
