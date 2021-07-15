import { always, prop } from 'ramda';
import transform from '../transform';
import posts from '../../__mocks__/posts';
import type { BlogPost } from '../../__mocks__/posts';

test('Performs a count', () => {
  interface BlogPostWithPostTitle extends BlogPost {
    postTitle: string;
  }
  const transformations = {
    published: always(false),
    postTitle: prop('title')
  };
  const transformed = transform<BlogPost, BlogPostWithPostTitle>(
    transformations
  )(posts);

  expect(transformed[0].published).toBe(false);
  expect(transformed[1].published).toBe(false);
  expect(transformed[2].published).toBe(false);

  expect(transformed[0].postTitle).toBe(transformed[0].title);
  expect(transformed[1].postTitle).toBe(transformed[1].title);
  expect(transformed[2].postTitle).toBe(transformed[2].title);

  expect(transformed).toMatchInlineSnapshot(`
    Array [
      Object {
        "count": 2,
        "description": "Description one",
        "genre": "Comedy",
        "postTitle": "One",
        "published": false,
        "tags": Array [
          "a",
          "b",
          "c",
          "y",
        ],
        "title": "One",
      },
      Object {
        "count": 2,
        "description": "Description two",
        "genre": "Comedy",
        "postTitle": "Two",
        "published": false,
        "tags": Array [
          "a",
          "x",
          "y",
        ],
        "title": "Two",
      },
      Object {
        "count": 5,
        "description": "Description three",
        "genre": "Horror",
        "postTitle": "Three",
        "published": false,
        "tags": Array [
          "b",
          "x",
          "y",
        ],
        "title": "Three",
      },
    ]
  `);
});
