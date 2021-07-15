import { always, split, prop } from 'ramda';
import cuddy from '..';
import books from '../__mocks__/books';
import type { Book } from '../__mocks__/books';
import type { Stages } from '../types';
import { inc, dec, set } from '../helpers';

// To simplify some of the inline snapshots, let's pick just the title, author and price
const defaultFields: (keyof Book)[] = ['title', 'author', 'price'];

describe('Match books', () => {
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

  test('all books where the author is not "Rob Sinclair"', () => {
    const match = { neq: { author: 'Rob Sinclair' } };
    const pipeline = cuddy<Book>({ match, fields: defaultFields });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(3);
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "author": "Douglas W. Hubbard",
          "price": 40.99,
          "title": "How to Measure Anything: Finding the Value of Intangibles in Business",
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

  test('all books that are priced lower than or equal to 30', () => {
    const match = {
      lte: { price: 30 }
    };
    const pipeline = cuddy<Book>({ match, fields: defaultFields });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(4);
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

  test('all non-fiction books', () => {
    const match = { nin: { genres: 'Fiction' } };
    const pipeline = cuddy<Book>({ match, fields: defaultFields });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(2);
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "author": "Douglas W. Hubbard",
          "price": 40.99,
          "title": "How to Measure Anything: Finding the Value of Intangibles in Business",
        },
        Object {
          "author": "Rob Sinclair",
          "price": 9.99,
          "title": "Imposter 13",
        },
      ]
    `);
  });
});

describe('Transform books', () => {
  test('change the property name summary to excerpt for all books', () => {
    interface BookWithExcerpt extends Book {
      excerpt: string;
    }
    const fields: (keyof BookWithExcerpt)[] = ['title', 'excerpt'];
    const pipeline = cuddy<Book, BookWithExcerpt>({
      fields,
      transform: { excerpt: prop('summary') }
    });
    const results = pipeline(books).aggregate();
    expect(results).toHaveLength(books.length);
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "excerpt": "This new edition continues to boldly assert that any perception of immeasurability is based on certain popular misconceptions about measurement and measurement methods. It shows the common reasoning for calling something immeasurable, and sets out to correct those ideas.",
          "title": "How to Measure Anything: Finding the Value of Intangibles in Business",
        },
        Object {
          "excerpt": "Against all odds, Aydin Torkal - aka Sleeper 13 - broke free from the terrorist group that took him as a child and raised him into a life of violence and hate.",
          "title": "Imposter 13",
        },
        Object {
          "excerpt": "Hunted not only by the world's intelligence agencies, but also by the elite brotherhood of insurgents he betrayed, he has lived the past year like a ghost. Until now",
          "title": "Fugitive 13",
        },
        Object {
          "excerpt": "That’s what New York City cop Barry Sutton is learning as he investigates the devastating phenomenon the media has dubbed False Memory Syndrome—a mysterious affliction that drives its victims mad with memories of a life they never lived.",
          "title": "Recursion",
        },
        Object {
          "excerpt": "Jason Dessen is walking home through the chilly Chicago streets one night, looking forward to a quiet evening in front of the fireplace with his wife, Daniela, and their son, Charlie—when his reality shatters.",
          "title": "Dark Matter",
        },
      ]
    `);
  });

  test('increment the number of reviews by 10 for all books', () => {
    const fields: (keyof Book)[] = ['title', 'reviews'];
    const pipeline = cuddy<Book>({
      fields,
      transform: { reviews: inc(10, 'reviews') }
    });
    const results = pipeline(books).aggregate();
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "reviews": 188,
          "title": "How to Measure Anything: Finding the Value of Intangibles in Business",
        },
        Object {
          "reviews": 25,
          "title": "Imposter 13",
        },
        Object {
          "reviews": 50,
          "title": "Fugitive 13",
        },
        Object {
          "reviews": 15034,
          "title": "Recursion",
        },
        Object {
          "reviews": 32109,
          "title": "Dark Matter",
        },
      ]
    `);
  });

  test('decrement the number of reviews by 10 for all books', () => {
    const fields: (keyof Book)[] = ['title', 'reviews'];
    const pipeline = cuddy<Book>({
      fields,
      transform: { reviews: dec(10, 'reviews') }
    });
    const results = pipeline(books).aggregate();
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "reviews": 168,
          "title": "How to Measure Anything: Finding the Value of Intangibles in Business",
        },
        Object {
          "reviews": 5,
          "title": "Imposter 13",
        },
        Object {
          "reviews": 30,
          "title": "Fugitive 13",
        },
        Object {
          "reviews": 15014,
          "title": "Recursion",
        },
        Object {
          "reviews": 32089,
          "title": "Dark Matter",
        },
      ]
    `);
  });

  test('set all books to be on sale', () => {
    const fields: (keyof Book)[] = ['title', 'onSale'];
    const pipeline = cuddy<Book>({
      fields,
      transform: { onSale: set(true) }
    });
    const results = pipeline(books).aggregate();
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "onSale": true,
          "title": "How to Measure Anything: Finding the Value of Intangibles in Business",
        },
        Object {
          "onSale": true,
          "title": "Imposter 13",
        },
        Object {
          "onSale": true,
          "title": "Fugitive 13",
        },
        Object {
          "onSale": true,
          "title": "Recursion",
        },
        Object {
          "onSale": true,
          "title": "Dark Matter",
        },
      ]
    `);
  });
});

describe('Group books', () => {
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
});

describe('Order books', () => {
  test('order all books by rating from lowest to highest', () => {
    const fields: (keyof Book)[] = ['title', 'rating'];
    const pipeline = cuddy<Book>({ fields, orderBy: { rating: 'asc' } });
    const results = pipeline(books).aggregate();
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "rating": 3.97,
          "title": "How to Measure Anything: Finding the Value of Intangibles in Business",
        },
        Object {
          "rating": 4.09,
          "title": "Dark Matter",
        },
        Object {
          "rating": 4.15,
          "title": "Fugitive 13",
        },
        Object {
          "rating": 4.15,
          "title": "Recursion",
        },
        Object {
          "rating": 4.36,
          "title": "Imposter 13",
        },
      ]
    `);
  });

  test('order all books by rating from highest to lowest', () => {
    const fields: (keyof Book)[] = ['title', 'rating'];
    const pipeline = cuddy<Book>({ fields, orderBy: { rating: 'desc' } });
    const results = pipeline(books).aggregate();
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "rating": 4.36,
          "title": "Imposter 13",
        },
        Object {
          "rating": 4.15,
          "title": "Fugitive 13",
        },
        Object {
          "rating": 4.15,
          "title": "Recursion",
        },
        Object {
          "rating": 4.09,
          "title": "Dark Matter",
        },
        Object {
          "rating": 3.97,
          "title": "How to Measure Anything: Finding the Value of Intangibles in Business",
        },
      ]
    `);
  });
});

describe('Paginate books', () => {
  test('limit the results to 2 books', () => {
    const pipeline = cuddy<Book>({ limit: 2 });
    const results = pipeline(books).aggregate();
    expect(Object.keys(results)).toHaveLength(2);
  });

  test('skip the first 2 books', () => {
    const pipeline = cuddy<Book>({ skip: 2 });
    const results = pipeline(books).aggregate();
    expect(Object.keys(results)).toHaveLength(books.length - 2);
  });
});

describe('Count books', () => {
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

describe('Transform books', () => {
  test('all books should now be on sale', () => {
    const fields: (keyof Book)[] = ['onSale'];
    const pipeline = cuddy<Book>({
      fields,
      transform: { onSale: always(true) }
    });
    const results = pipeline(books).aggregate();
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "onSale": true,
        },
        Object {
          "onSale": true,
        },
        Object {
          "onSale": true,
        },
        Object {
          "onSale": true,
        },
        Object {
          "onSale": true,
        },
      ]
    `);
  });

  test('all books should have a new field based on an existing field', () => {
    interface BookWithFirstName extends Book {
      firstName: string;
    }
    function valueAt(idx: number, field: keyof Book): (r: Book) => unknown {
      return function transform(record): unknown {
        const fieldValue = prop(field, record);

        if (typeof fieldValue === 'string') {
          const values = split(' ', fieldValue);
          return values[idx];
        }

        return null;
      };
    }
    const fields: (keyof Book)[] = ['author'];
    const pipeline = cuddy<Book, BookWithFirstName>({
      fields,
      transform: { firstName: valueAt(0, 'author') }
    });
    const results = pipeline(books).aggregate();
    expect(results).toMatchInlineSnapshot(`
      Array [
        Object {
          "author": "Douglas W. Hubbard",
          "firstName": "Douglas",
        },
        Object {
          "author": "Rob Sinclair",
          "firstName": "Rob",
        },
        Object {
          "author": "Rob Sinclair",
          "firstName": "Rob",
        },
        Object {
          "author": "Blake Crouch",
          "firstName": "Blake",
        },
        Object {
          "author": "Blake Crouch",
          "firstName": "Blake",
        },
      ]
    `);
  });
});

describe('Explain books', () => {
  test('explain the query', () => {
    const noop = (): void => {};
    const query: Partial<Stages<Book>> = {
      match: {
        in: { genres: 'Fiction' },
        gt: { price: 9 },
        lte: { price: 5 }
      },
      orderBy: { ratings: 'asc', reviews: 'desc' },
      countBy: 'ratings',
      fields: ['author', 'title', 'ratings'],
      transform: { author: noop, title: noop, blurb: noop }
    };
    const pipeline = cuddy<Book>(query);
    const explanation = pipeline(books).explain();

    expect(explanation).toMatchInlineSnapshot(`
      Object {
        "collectionSize": 5,
        "query": Array [
          Object {
            "comparator": "Fiction",
            "field": "genres",
            "operator": "in",
            "query": "'genres' contains 'Fiction'",
            "type": "match",
          },
          Object {
            "comparator": 9,
            "field": "price",
            "operator": "gt",
            "query": "'price' is greater than '9'",
            "type": "match",
          },
          Object {
            "comparator": 5,
            "field": "price",
            "operator": "lte",
            "query": "'price' is lower than or equal to '5'",
            "type": "match",
          },
          Object {
            "field": "ratings",
            "order": "asc",
            "query": "'ratings' from lowest to highest",
            "type": "orderBy",
          },
          Object {
            "field": "reviews",
            "order": "desc",
            "query": "'reviews' from highest to lowest",
            "type": "orderBy",
          },
          Object {
            "projection": Array [
              "author",
              "title",
              "ratings",
            ],
            "query": "'author', 'title' and 'ratings'",
            "type": "fields",
          },
          Object {
            "field": "author",
            "query": "TRANSFORM 'author'",
            "type": "transform",
          },
          Object {
            "field": "title",
            "query": "TRANSFORM 'title'",
            "type": "transform",
          },
          Object {
            "field": "blurb",
            "query": "TRANSFORM 'blurb'",
            "type": "transform",
          },
          Object {
            "field": "ratings",
            "query": "'ratings'",
            "type": "countBy",
          },
        ],
        "queryHash": "y08vyc",
        "summary": "MATCH items in the collection WHERE 'genres' contains 'Fiction' AND 'price' is greater than '9' AND 'price' is lower than or equal to '5'. ORDER the results BY 'ratings' from lowest to highest AND 'reviews' from highest to lowest. ONLY RETURN the 'author', 'title' and 'ratings' fields for each result. FOR EACH of the results, TRANSFORM 'author' AND TRANSFORM 'title' AND TRANSFORM 'blurb'. COUNT the results BY 'ratings'",
        "totalOperations": 10,
      }
    `);
  });
});
