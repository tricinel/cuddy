import cuddy from '..';
import books from '../__mocks__/books';
import type { Book } from '../__mocks__/books';

// To simplify some of the inline snapshots, let's pick just the title, author and price
const defaultFields: (keyof Book)[] = ['title', 'author', 'price'];

describe('Find books', () => {
  test('all books where the author is "Rob Sinclair"', () => {
    const match = { eq: { author: 'Rob Sinclair' } };
    const pipeline = cuddy<Book>({ match, fields: defaultFields });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(2);
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "author": "Rob Sinclair",
          "price": 9.99,
          "title": "Imposter 13",
        },
        Object {
          "author": "Rob Sinclair",
          "price": 4.99,
          "title": "Fugitive 13",
        },
      ]
    `);
  });

  test('all books that are on sale with a price lower than 6', () => {
    const match = { eq: { onSale: true }, lt: { price: 6 } };
    const pipeline = cuddy<Book>({ match });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(1);
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "author": "Rob Sinclair",
          "genres": Array [
            "Thriller",
            "Fiction",
            "Politics",
          ],
          "onSale": true,
          "price": 4.99,
          "rating": 4.15,
          "ratings": 700,
          "reviews": 40,
          "summary": "Hunted not only by the world's intelligence agencies, but also by the elite brotherhood of insurgents he betrayed, he has lived the past year like a ghost. Until now",
          "title": "Fugitive 13",
        },
      ]
    `);
  });

  test('all fiction books with a rating greater than or equal to 4.1', () => {
    const match = { in: { genres: 'Fiction' }, gte: { rating: 4.1 } };
    const pipeline = cuddy<Book>({ match, fields: defaultFields });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(2);
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "author": "Rob Sinclair",
          "price": 4.99,
          "title": "Fugitive 13",
        },
        Object {
          "author": "Blake Crouch",
          "price": 6.99,
          "title": "Recursion",
        },
      ]
    `);
  });

  test('all thriller books with a rating of at least 3 and more than 30 reviews', () => {
    const match = {
      in: { genres: 'Thriller' },
      gte: { rating: 3 },
      gt: { reviews: 30 }
    };
    const pipeline = cuddy<Book>({ match, fields: defaultFields });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(3);
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "author": "Rob Sinclair",
          "price": 4.99,
          "title": "Fugitive 13",
        },
        Object {
          "author": "Blake Crouch",
          "price": 6.99,
          "title": "Recursion",
        },
        Object {
          "author": "Blake Crouch",
          "price": 11.99,
          "title": "Dark Matter",
        },
      ]
    `);
  });

  test('all books that are on not sale and are priced between 10 and 30', () => {
    const match = {
      eq: { onSale: false },
      lt: { price: 30 },
      gt: { price: 10 }
    };
    const pipeline = cuddy<Book>({ match, fields: defaultFields });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(1);
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "author": "Blake Crouch",
          "price": 11.99,
          "title": "Dark Matter",
        },
      ]
    `);
  });

  test('all books that contain the word "life" in the summary and pick only the title and price', () => {
    const match = { in: { summary: 'life' } };
    const fields: (keyof Book)[] = ['title', 'price'];
    const pipeline = cuddy<Book>({ match, fields });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(2);
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "price": 9.99,
          "title": "Imposter 13",
        },
        Object {
          "price": 6.99,
          "title": "Recursion",
        },
      ]
    `);
  });

  test('group all books with a rating greater than or equal to 4 by author and pick only the title', () => {
    const match = { gt: { rating: 4 } };
    const groupBy = 'author';
    const fields: (keyof Book)[] = ['title'];
    const pipeline = cuddy<Book>({ match, fields, groupBy });
    const results = pipeline(books).aggregate();
    expect(Object.keys(results)).toHaveLength(2);
    expect(results).toMatchInlineSnapshot(`
      Object {
        "Blake Crouch": Array [
          Object {
            "title": "Recursion",
          },
          Object {
            "title": "Dark Matter",
          },
        ],
        "Rob Sinclair": Array [
          Object {
            "title": "Imposter 13",
          },
          Object {
            "title": "Fugitive 13",
          },
        ],
      }
    `);
  });

  test('count all books by author where the genres include Fiction', () => {
    const match = { in: { genres: 'Fiction' } };
    const countBy = 'author';
    const pipeline = cuddy<Book>({ match, fields: defaultFields, countBy });
    const results = pipeline(books).aggregate();
    expect(Object.keys(results)).toHaveLength(2);
    expect(results).toMatchInlineSnapshot(`
      Object {
        "Blake Crouch": 2,
        "Rob Sinclair": 1,
      }
    `);
  });
});
