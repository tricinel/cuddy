import count from '../count';
import posts from '../../__mocks__/posts';
import type { BlogPost } from '../../__mocks__/posts';

test('Performs a count', () => {
  expect(count<BlogPost>('genre')(posts)).toEqual({
    /* eslint-disable @typescript-eslint/naming-convention */
    Comedy: 2,
    Horror: 1
    /* eslint-enable @typescript-eslint/naming-convention */
  });
});
