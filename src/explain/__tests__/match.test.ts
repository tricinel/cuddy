import explainMatch, { buildMatchOperation } from '../match';
import type { MatchOperation } from '../match';

describe('Builds the match operations', () => {
  test('single operator', () => {
    const query = {
      eq: { author: 'Rob Sinclair' }
    };

    expect(buildMatchOperation(query)).toEqual([
      {
        type: 'match',
        operator: 'eq',
        field: 'author',
        comparator: 'Rob Sinclair',
        query: `'author' is 'Rob Sinclair'`
      }
    ]);
  });

  test('multiple operators', () => {
    const query = {
      eq: { author: 'Rob Sinclair', title: 'Boo' },
      in: { genres: 'Fiction' }
    };

    expect(buildMatchOperation(query)).toEqual([
      {
        type: 'match',
        operator: 'eq',
        field: 'author',
        comparator: 'Rob Sinclair',
        query: `'author' is 'Rob Sinclair'`
      },
      {
        type: 'match',
        operator: 'eq',
        field: 'title',
        comparator: 'Boo',
        query: `'title' is 'Boo'`
      },
      {
        type: 'match',
        operator: 'in',
        field: 'genres',
        comparator: 'Fiction',
        query: `'genres' contains 'Fiction'`
      }
    ]);
  });
});

describe('Explains the match stage', () => {
  test('single operation', () => {
    const operations: MatchOperation[] = [
      {
        type: 'match',
        operator: 'eq',
        field: 'author',
        comparator: 'Rob Sinclair',
        query: `'author' is 'Rob Sinclair'`
      }
    ];

    expect(explainMatch(operations)).toEqual(
      `MATCH items in the collection WHERE 'author' is 'Rob Sinclair'`
    );
  });

  test('multiple operations', () => {
    const operations: MatchOperation[] = [
      {
        type: 'match',
        operator: 'eq',
        field: 'author',
        comparator: 'Rob Sinclair',
        query: `'author' is 'Rob Sinclair'`
      },
      {
        type: 'match',
        operator: 'eq',
        field: 'title',
        comparator: 'Boo',
        query: `'title' is 'Boo'`
      },
      {
        type: 'match',
        operator: 'in',
        field: 'genres',
        comparator: 'Fiction',
        query: `'genres' contains 'Fiction'`
      }
    ];

    expect(explainMatch(operations)).toEqual(
      `MATCH items in the collection WHERE 'author' is 'Rob Sinclair' AND 'title' is 'Boo' AND 'genres' contains 'Fiction'`
    );
  });
});
