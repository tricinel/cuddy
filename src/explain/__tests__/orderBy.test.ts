import explainOrderBy, { buildOrderByOperation } from '../orderBy';
import type { OrderByOperation } from '../orderBy';

const orderByReviews: OrderByOperation = {
  type: 'orderBy',
  field: 'reviews',
  order: 'asc',
  query: "'reviews' from lowest to highest"
};

const orderByRatings: OrderByOperation = {
  type: 'orderBy',
  field: 'ratings',
  order: 'desc',
  query: "'ratings' from highest to lowest"
};

test('Builds the orderBy operation object', () => {
  expect(buildOrderByOperation({ reviews: 'asc' })).toEqual([orderByReviews]);
  expect(buildOrderByOperation({ reviews: 'asc', ratings: 'desc' })).toEqual([
    orderByReviews,
    orderByRatings
  ]);
});

test('Builds the summary for the OrderBy', () => {
  expect(explainOrderBy([orderByReviews])).toEqual(
    `ORDER the results BY 'reviews' from lowest to highest`
  );
  expect(explainOrderBy([orderByRatings])).toEqual(
    `ORDER the results BY 'ratings' from highest to lowest`
  );
  expect(explainOrderBy([orderByReviews, orderByRatings])).toEqual(
    `ORDER the results BY 'reviews' from lowest to highest AND 'ratings' from highest to lowest`
  );
});
