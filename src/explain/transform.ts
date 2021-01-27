import { compose, reduce, concat, flatten, join, map, toPairs } from 'ramda';
import config from '../config';
import toStringIfNeeded from '../utils/toString';
import type { BaseOperation } from './query';
import type { Transformations } from '../types';

// eslint-disable-next-line import/no-unused-modules
export interface TransformOperation extends BaseOperation {
  type: 'transform';
  operator: keyof Transformations<never>;
  field: string;
  transformation: unknown;
}

export function buildTransformOperation(
  query: Partial<Record<keyof Transformations<string>, Record<string, unknown>>>
): TransformOperation[] {
  type Pair = [keyof Transformations<string>, Record<string, unknown>];
  const pairs: Pair[] = toPairs(query) as Pair[];

  const toTransformOperations = ([
    operator,
    matchers
  ]: Pair): TransformOperation[] =>
    map(
      ([field, transformation]) => ({
        type: 'transform',
        operator,
        field,
        transformation,
        query: `${config.operators.transform[operator](
          field
        )} '${toStringIfNeeded(transformation)}'`
      }),
      toPairs(matchers)
    );

  return flatten(map(toTransformOperations)(pairs));
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
