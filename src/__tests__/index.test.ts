import cuddy from '..';
import posts from '../__mocks__/posts';
import type { BlogPost } from '../__mocks__/posts';

describe('Aggregation', () => {
  test('Builds pipeline and waits for data', () => {
    const match = { eq: { title: 'One' } };
    const pipeline = cuddy({ match });
    expect(pipeline(posts).aggregate()).toEqual([posts[0]]);
  });

  test('Runs the aggregation when data is present', () => {
    const pipeline = cuddy({ match: { eq: { title: 'One' } } }, posts);
    expect(pipeline.aggregate()).toEqual([posts[0]]);
  });

  test('Combine operators', () => {
    const pipeline = cuddy(
      {
        match: { eq: { title: 'One' }, gte: { count: 2 } }
      },
      posts
    );
    expect(pipeline.aggregate()).toEqual([posts[0]]);
  });
});

describe('Find some elements', () => {
  test('Finds the first', () => {
    const match = { in: { tags: 'a' } };
    const pipeline = cuddy({ match });
    expect(pipeline(posts).first()).toEqual(posts[0]);
  });

  test('Finds the last', () => {
    const match = { in: { tags: 'a' } };
    const pipeline = cuddy({ match });
    expect(pipeline(posts).last()).toEqual(posts[1]);
  });
});

describe('Other functions', () => {
  test('Returns the number of results', () => {
    const pipeline = cuddy({});
    expect(pipeline(posts).count()).toEqual(3);
  });

  test('Groups', () => {
    const groupBy = 'genre';
    const pipeline = cuddy<BlogPost>({ groupBy });
    expect(pipeline(posts).aggregate()).toEqual({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Comedy: [...posts.slice(0, 2)],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Horror: [posts[2]]
    });
  });

  test('Groups with fields projected', () => {
    const groupBy = 'genre';
    const fields: (keyof BlogPost)[] = ['title'];
    const pipeline = cuddy<BlogPost>({ groupBy, fields });
    expect(pipeline(posts).aggregate()).toEqual({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Comedy: [{ title: 'One' }, { title: 'Two' }],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Horror: [{ title: 'Three' }]
    });
  });

  test('Counts', () => {
    const countBy = 'genre';
    const pipeline = cuddy<BlogPost>({ countBy });
    expect(pipeline(posts).aggregate()).toEqual({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Comedy: 2,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Horror: 1
    });
  });
});
