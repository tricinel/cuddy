import alias from '../alias';
import posts from '../../__mocks__/posts';

test('Renames keys', () => {
  const rename = { title: 'name', description: 'summary' };
  const aliased = alias(rename)(posts);
  expect(aliased).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
        summary: expect.any(String)
      })
    ])
  );
  expect(aliased).toEqual(
    expect.not.arrayContaining([
      expect.objectContaining({
        title: expect.any(String),
        description: expect.any(String)
      })
    ])
  );
  expect(aliased).toMatchInlineSnapshot(`
    Array [
      Object {
        "count": 2,
        "genre": "Comedy",
        "name": "One",
        "published": true,
        "summary": "Description one",
        "tags": Array [
          "a",
          "b",
          "c",
          "y",
        ],
      },
      Object {
        "count": 2,
        "genre": "Comedy",
        "name": "Two",
        "published": false,
        "summary": "Description two",
        "tags": Array [
          "a",
          "x",
          "y",
        ],
      },
      Object {
        "count": 5,
        "genre": "Horror",
        "name": "Three",
        "published": true,
        "summary": "Description three",
        "tags": Array [
          "b",
          "x",
          "y",
        ],
      },
    ]
  `);
});
