import { pickFields, pickFieldsWhenGrouped } from '../fields';
import posts from '../../__mocks__/posts';

test('Picks fields', () => {
  expect(pickFields(['title'])(posts)).toEqual([
    { title: 'One' },
    { title: 'Two' },
    { title: 'Three' }
  ]);
});

test('Picks fields when grouped', () => {
  const groupedPosts = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Comedy: [...posts.slice(0, 2)],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Horror: [posts[2]]
  };

  expect(pickFieldsWhenGrouped(['title'])(groupedPosts)).toEqual({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Comedy: [{ title: 'One' }, { title: 'Two' }],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Horror: [{ title: 'Three' }]
  });
});
