import explainLimit, { buildLimitOperation } from '../limit';
import type { LimitOperation } from '../limit';

test('Builds the limit operation object', () => {
  expect(buildLimitOperation(1)).toEqual({
    type: 'limit',
    count: 1,
    query: '1 result'
  });
  expect(buildLimitOperation(10)).toEqual({
    type: 'limit',
    count: 10,
    query: '10 results'
  });
});

test('Builds the summary for the limit', () => {
  const operation: LimitOperation = {
    type: 'limit',
    count: 1,
    query: '1 result'
  };
  expect(explainLimit(operation)).toEqual('LIMIT to maximum 1 result');
});
