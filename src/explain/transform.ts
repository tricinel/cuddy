import { compose, reduce, concat, keys, join, map } from 'ramda';
import type { BaseOperation } from './query';

// eslint-disable-next-line import/no-unused-modules
export interface TransformOperation extends BaseOperation {
  type: 'transform';
  field: string;
}

export function buildTransformOperation(
  query: Record<string, unknown>
): TransformOperation[] {
  function toTransformOperations(field: string): TransformOperation {
    return {
      type: 'transform',
      field,
      query: `TRANSFORM '${field}'`
    };
  }

  return map(toTransformOperations)(keys(query));
}

export default function explainTransform(
  operations: TransformOperation[]
): string {
  return compose(
    concat('FOR EACH of the results, '),
    join(' AND '),
    reduce<TransformOperation, string[]>(function appendQuery(
      queries,
      { query }
    ) {
      return [...queries, query];
    },
    [])
  )(operations);
}
