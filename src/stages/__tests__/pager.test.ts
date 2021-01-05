import segment from '../pager';
import posts from '../../__mocks__/posts';

test('Segment the data with limit and skip', () => {
  expect(segment({ skip: 1, limit: 1 })(posts)).toEqual([...posts.slice(1, 1)]);
});

test('Segment the data with default values for limit and skip', () => {
  expect(segment({})(posts)).toEqual([...posts]);
});
