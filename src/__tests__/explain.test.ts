import explainPipeline from '../explain';
import books from '../__mocks__/books';
import type { Book } from '../__mocks__/books';
import type { Stages } from '../types';

describe('Match stage', () => {
  test('explains a match', () => {
    const stages = {
      match: {
        eq: { author: 'Rob Sinclair', title: 'Boo' },
        in: { genres: 'Fiction' }
      }
    };
    expect(explainPipeline<Book>(stages, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 3,
        summary:
          "MATCH items in the collection WHERE 'author' is 'Rob Sinclair' AND 'title' is 'Boo' AND 'genres' contains 'Fiction'"
      })
    );
  });

  test('explains a skip', () => {
    const stages = {
      skip: 10
    };
    expect(explainPipeline<Book>(stages, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 1,
        summary: 'SKIP the first 10 results'
      })
    );
  });

  test('explains a limit', () => {
    const stages = {
      limit: 20
    };
    expect(explainPipeline<Book>(stages, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 1,
        summary: 'LIMIT to maximum 20 results'
      })
    );
  });

  test('explains a countBy', () => {
    const stages: Partial<Stages<Book>> = {
      countBy: 'title'
    };
    expect(explainPipeline<Book>(stages, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 1,
        summary: "COUNT the results BY 'title'"
      })
    );
  });

  test('explains a fields', () => {
    const stages: Partial<Stages<Book>> = {
      fields: ['title']
    };
    expect(explainPipeline<Book>(stages, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 1,
        summary: "ONLY RETURN the 'title' field for each result"
      })
    );

    const stagesWithMultipleFields: Partial<Stages<Book>> = {
      fields: ['title', 'author']
    };
    expect(explainPipeline<Book>(stagesWithMultipleFields, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 1,
        summary: "ONLY RETURN the 'title' and 'author' fields for each result"
      })
    );
  });

  test('explains an orderBy', () => {
    const stages: Partial<Stages<Book>> = {
      orderBy: { reviews: 'asc' }
    };
    expect(explainPipeline<Book>(stages, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 1,
        summary: "ORDER the results BY 'reviews' from lowest to highest"
      })
    );

    const stagesWithMultipleOrders: Partial<Stages<Book>> = {
      orderBy: { reviews: 'asc', ratings: 'desc' }
    };
    expect(explainPipeline<Book>(stagesWithMultipleOrders, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 2,
        summary:
          "ORDER the results BY 'reviews' from lowest to highest AND 'ratings' from highest to lowest"
      })
    );
  });

  test('explains a groupBy', () => {
    const stages: Partial<Stages<Book>> = {
      groupBy: 'title'
    };
    expect(explainPipeline<Book>(stages, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 1,
        summary: "GROUP the results BY 'title'"
      })
    );
  });
});

describe('All stages', () => {
  const noop = (): void => {};

  test('explains a complete query', () => {
    const stages: Partial<Stages<Book>> = {
      match: {
        eq: { author: 'Rob Sinclair', title: 'Dark' },
        in: { genres: 'Fiction' }
      },
      limit: 2,
      skip: 1,
      countBy: 'reviews',
      fields: ['author', 'title', 'blurb'],
      orderBy: { reviews: 'asc', ratings: 'desc' },
      groupBy: 'title',
      transform: {
        author: noop,
        reviews: noop,
        ratings: noop,
        onSale: noop
      }
    };
    expect(explainPipeline<Book>(stages, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 14,
        summary:
          "MATCH items in the collection WHERE 'author' is 'Rob Sinclair' AND 'title' is 'Dark' AND 'genres' contains 'Fiction'. ORDER the results BY 'reviews' from lowest to highest AND 'ratings' from highest to lowest. ONLY RETURN the 'author', 'title' and 'blurb' fields for each result. FOR EACH of the results, TRANSFORM 'author' AND TRANSFORM 'reviews' AND TRANSFORM 'ratings' AND TRANSFORM 'onSale'. SKIP the first 1 result. LIMIT to maximum 2 results. GROUP the results BY 'title'. COUNT the results BY 'reviews'"
      })
    );
  });

  test('explains a complete query in the correct order', () => {
    const stages: Partial<Stages<Book>> = {
      limit: 2,
      countBy: 'reviews',
      fields: ['author', 'title', 'blurb'],
      match: {
        eq: { author: 'Rob Sinclair', title: 'Dark' },
        in: { genres: 'Fiction' }
      },
      groupBy: 'title',
      skip: 1,
      orderBy: { reviews: 'asc', ratings: 'desc' },
      transform: {
        author: noop,
        reviews: noop,
        ratings: noop,
        onSale: noop
      }
    };
    expect(explainPipeline<Book>(stages, books)).toEqual(
      expect.objectContaining({
        collectionSize: books.length,
        totalOperations: 14,
        summary:
          "MATCH items in the collection WHERE 'author' is 'Rob Sinclair' AND 'title' is 'Dark' AND 'genres' contains 'Fiction'. ORDER the results BY 'reviews' from lowest to highest AND 'ratings' from highest to lowest. ONLY RETURN the 'author', 'title' and 'blurb' fields for each result. FOR EACH of the results, TRANSFORM 'author' AND TRANSFORM 'reviews' AND TRANSFORM 'ratings' AND TRANSFORM 'onSale'. SKIP the first 1 result. LIMIT to maximum 2 results. GROUP the results BY 'title'. COUNT the results BY 'reviews'"
      })
    );
  });
});
