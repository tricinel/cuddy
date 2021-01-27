import explainTransform, { buildTransformOperation } from '../transform';
import type { TransformOperation } from '../transform';

describe('Builds the transform operations', () => {
  test('single operator', () => {
    const query = {
      alias: { author: 'name' }
    };

    expect(buildTransformOperation(query)).toEqual([
      {
        type: 'transform',
        operator: 'alias',
        field: 'author',
        transformation: 'name',
        query: `RENAME 'author' to 'name'`
      }
    ]);
  });

  test('multiple operators', () => {
    const query = {
      alias: { author: 'name', title: 'bookTitle' },
      set: { blurb: 'Read more about it', onSale: true, price: 10 },
      inc: { ratings: 1, reviews: 2 },
      dec: { ratings: 2, reviews: 1 }
    };

    expect(buildTransformOperation(query)).toEqual([
      {
        type: 'transform',
        operator: 'alias',
        field: 'author',
        transformation: 'name',
        query: "RENAME 'author' to 'name'"
      },
      {
        type: 'transform',
        operator: 'alias',
        field: 'title',
        transformation: 'bookTitle',
        query: "RENAME 'title' to 'bookTitle'"
      },
      {
        type: 'transform',
        operator: 'set',
        field: 'blurb',
        transformation: 'Read more about it',
        query: "SET 'blurb' to 'Read more about it'"
      },
      {
        type: 'transform',
        operator: 'set',
        field: 'onSale',
        transformation: true,
        query: "SET 'onSale' to 'true'"
      },
      {
        type: 'transform',
        operator: 'set',
        field: 'price',
        transformation: 10,
        query: "SET 'price' to '10'"
      },
      {
        type: 'transform',
        operator: 'inc',
        field: 'ratings',
        transformation: 1,
        query: "INCREMENT 'ratings' by '1'"
      },
      {
        type: 'transform',
        operator: 'inc',
        field: 'reviews',
        transformation: 2,
        query: "INCREMENT 'reviews' by '2'"
      },
      {
        type: 'transform',
        operator: 'dec',
        field: 'ratings',
        transformation: 2,
        query: "DECREMENT 'ratings' by '2'"
      },
      {
        type: 'transform',
        operator: 'dec',
        field: 'reviews',
        transformation: 1,
        query: "DECREMENT 'reviews' by '1'"
      }
    ]);
  });
});

describe('Explains the match stage', () => {
  test('single operation', () => {
    const operations: TransformOperation[] = [
      {
        type: 'transform',
        operator: 'alias',
        field: 'author',
        transformation: 'name',
        query: `RENAME 'author' to 'name'`
      }
    ];

    expect(explainTransform(operations)).toEqual(
      `FOR EACH of the results, RENAME 'author' to 'name'`
    );
  });

  test('multiple operations', () => {
    const operations: TransformOperation[] = [
      {
        type: 'transform',
        operator: 'alias',
        field: 'author',
        transformation: 'name',
        query: "RENAME 'author' to 'name'"
      },
      {
        type: 'transform',
        operator: 'alias',
        field: 'title',
        transformation: 'bookTitle',
        query: "RENAME 'title' to 'bookTitle'"
      },
      {
        type: 'transform',
        operator: 'set',
        field: 'blurb',
        transformation: 'Read more about it',
        query: "SET 'blurb' to 'Read more about it'"
      },
      {
        type: 'transform',
        operator: 'set',
        field: 'onSale',
        transformation: true,
        query: "SET 'onSale' to 'true'"
      },
      {
        type: 'transform',
        operator: 'set',
        field: 'price',
        transformation: 10,
        query: "SET 'price' to '10'"
      },
      {
        type: 'transform',
        operator: 'inc',
        field: 'ratings',
        transformation: 1,
        query: "INCREMENT 'ratings' by '1'"
      },
      {
        type: 'transform',
        operator: 'inc',
        field: 'reviews',
        transformation: 2,
        query: "INCREMENT 'reviews' by '2'"
      },
      {
        type: 'transform',
        operator: 'dec',
        field: 'ratings',
        transformation: 2,
        query: "DECREMENT 'ratings' by '2'"
      },
      {
        type: 'transform',
        operator: 'dec',
        field: 'reviews',
        transformation: 1,
        query: "DECREMENT 'reviews' by '1'"
      }
    ];

    expect(explainTransform(operations)).toEqual(
      `FOR EACH of the results, RENAME 'author' to 'name' AND RENAME 'title' to 'bookTitle' AND SET 'blurb' to 'Read more about it' AND SET 'onSale' to 'true' AND SET 'price' to '10' AND INCREMENT 'ratings' by '1' AND INCREMENT 'reviews' by '2' AND DECREMENT 'ratings' by '2' AND DECREMENT 'reviews' by '1'`
    );
  });
});
