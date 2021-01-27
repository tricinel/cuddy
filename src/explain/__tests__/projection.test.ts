import explainProjection, { buildProjectOperation } from '../projection';
import type { ProjectOperation } from '../projection';

test('Builds the projection operation object', () => {
  expect(buildProjectOperation(['title'])).toEqual({
    type: 'fields',
    projection: ['title'],
    query: "'title'"
  });
  expect(buildProjectOperation(['title', 'author'])).toEqual({
    type: 'fields',
    projection: ['title', 'author'],
    query: "'title' and 'author'"
  });
  expect(buildProjectOperation(['title', 'author', 'reviews'])).toEqual({
    type: 'fields',
    projection: ['title', 'author', 'reviews'],
    query: "'title', 'author' and 'reviews'"
  });
});

test('Builds the summary for the projection', () => {
  const operation: ProjectOperation = {
    type: 'fields',
    projection: ['title', 'author', 'reviews'],
    query: "'title', 'author' and 'reviews'"
  };
  expect(explainProjection(operation)).toEqual(
    "ONLY RETURN the 'title', 'author' and 'reviews' fields for each result"
  );
});
