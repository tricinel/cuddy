import explainCountBy, { buildCountByOperation } from '../countBy';
import type { CountByOperation } from '../countBy';

test('Builds the countBy operation object', () => {
  expect(buildCountByOperation('title')).toEqual({
    type: 'countBy',
    field: 'title',
    query: "'title'"
  });
});

test('Builds the summary for the countBy', () => {
  const operation: CountByOperation = {
    type: 'countBy',
    field: 'title',
    query: "'title'"
  };
  expect(explainCountBy(operation)).toEqual(`COUNT BY 'title'`);
});
