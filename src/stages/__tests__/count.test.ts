import count from '../count';
import posts from '../../__mocks__/posts';

test('Performs a count', () => {
  expect(count('genre')(posts)).toEqual({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Comedy: 2,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Horror: 1
  });
});
