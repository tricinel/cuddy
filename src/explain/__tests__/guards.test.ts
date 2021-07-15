import {
  isMatchStage,
  isSkipStage,
  isLimitStage,
  isCountByStage,
  isProjectionStage,
  isOrderByStage,
  isGroupByStage,
  isTransformStage
} from '../guards';
import type { MatchOperation } from '../match';
import type { SkipOperation } from '../skip';
import type { LimitOperation } from '../limit';
import type { CountByOperation } from '../countBy';
import type { ProjectOperation } from '../projection';
import type { OrderByOperation } from '../orderBy';
import type { GroupByOperation } from '../groupBy';
import type { TransformOperation } from '../transform';

test('Correctly determines if it is a match stage or not', () => {
  const testMatch: MatchOperation = {
    type: 'match',
    operator: 'eq',
    field: 'title',
    comparator: 'Bob',
    query: ''
  };

  const oneMatch = [{ ...testMatch }];
  const twoMatches = [{ ...testMatch }, { ...testMatch, field: 'author' }];
  const noMatch = [{ ...testMatch, type: 'countBy' }];
  const noMatches = [{ ...testMatch }, { ...testMatch, type: 'countBy' }];

  expect(isMatchStage('match', oneMatch)).toBeTruthy();
  expect(isMatchStage('match', twoMatches)).toBeTruthy();
  expect(isMatchStage('countBy', oneMatch)).toBeFalsy();
  // @ts-expect-error the type is modified for the test
  expect(isMatchStage('match', noMatch)).toBeFalsy();
  // @ts-expect-error the type is modified for the test
  expect(isMatchStage('match', noMatches)).toBeFalsy();
});

test('Correctly determines if it is a skip stage or not', () => {
  const skip: SkipOperation[] = [{ type: 'skip', count: 1, query: '' }];

  expect(isSkipStage('skip', skip)).toBeTruthy();
  expect(isSkipStage('match', skip)).toBeFalsy();
  // @ts-expect-error the type is modified for the test
  expect(isSkipStage('skip', [{ ...skip, type: 'match' }])).toBeFalsy();
});

test('Correctly determines if it is a limit stage or not', () => {
  const limit: LimitOperation[] = [{ type: 'limit', count: 1, query: '' }];

  expect(isLimitStage('limit', limit)).toBeTruthy();
  expect(isLimitStage('match', limit)).toBeFalsy();
  // @ts-expect-error the type is modified for the test
  expect(isLimitStage('limit', [{ ...limit, type: 'match' }])).toBeFalsy();
});

test('Correctly determines if it is a countBy stage or not', () => {
  const countBy: CountByOperation[] = [
    { type: 'countBy', field: 'title', query: '' }
  ];

  expect(isCountByStage('countBy', countBy)).toBeTruthy();
  expect(isCountByStage('match', countBy)).toBeFalsy();
  expect(
    // @ts-expect-error the type is modified for the test
    isCountByStage('countBy', [{ ...countBy, type: 'match' }])
  ).toBeFalsy();
});

test('Correctly determines if it is a fields stage or not', () => {
  const fields: ProjectOperation[] = [
    { type: 'fields', projection: ['title'], query: '' }
  ];

  expect(isProjectionStage('fields', fields)).toBeTruthy();
  expect(isProjectionStage('match', fields)).toBeFalsy();
  expect(
    // @ts-expect-error the type is modified for the test
    isProjectionStage('fields', [{ ...fields, type: 'match' }])
  ).toBeFalsy();
});

test('Correctly determines if it is a orderBy stage or not', () => {
  const orderBy: OrderByOperation[] = [
    { type: 'orderBy', field: 'reviews', order: 'asc', query: '' }
  ];

  expect(isOrderByStage('orderBy', orderBy)).toBeTruthy();
  expect(isOrderByStage('match', orderBy)).toBeFalsy();
  expect(
    // @ts-expect-error the type is modified for the test
    isOrderByStage('orderBy', [{ ...orderBy, type: 'match' }])
  ).toBeFalsy();
});

test('Correctly determines if it is a groupBy stage or not', () => {
  const groupBy: GroupByOperation[] = [
    { type: 'groupBy', field: 'title', query: '' }
  ];

  expect(isGroupByStage('groupBy', groupBy)).toBeTruthy();
  expect(isGroupByStage('match', groupBy)).toBeFalsy();
  expect(
    // @ts-expect-error the type is modified for the test
    isGroupByStage('groupBy', [{ ...groupBy, type: 'match' }])
  ).toBeFalsy();
});

test('Correctly determines if it is a transform stage or not', () => {
  const transform: TransformOperation[] = [
    {
      type: 'transform',
      field: 'title',
      query: ''
    }
  ];

  expect(isTransformStage('transform', transform)).toBeTruthy();
  expect(isTransformStage('match', transform)).toBeFalsy();
  expect(
    // @ts-expect-error the type is modified for the test
    isTransformStage('transform', [{ ...transform, type: 'match' }])
  ).toBeFalsy();
});
