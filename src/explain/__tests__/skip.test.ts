import explainSkip, { buildSkipOperation } from '../skip';
import type { SkipOperation } from '../skip';

test('Builds the skip operation object', () => {
  expect(buildSkipOperation(1)).toEqual({
    type: 'skip',
    count: 1,
    query: '1 result'
  });
  expect(buildSkipOperation(10)).toEqual({
    type: 'skip',
    count: 10,
    query: '10 results'
  });
});

test('Builds the summary for the skip', () => {
  const operation: SkipOperation = {
    type: 'skip',
    count: 1,
    query: '1 result'
  };
  expect(explainSkip(operation)).toEqual('SKIP the first 1 result');
});
