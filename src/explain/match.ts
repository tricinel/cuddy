import { flatten, map, reduce, toPairs, join, compose, concat } from 'ramda';
import config from '../config';
import type { Matchers } from '../types';
import type { BaseOperation } from './query';

// eslint-disable-next-line import/no-unused-modules
export interface MatchOperation extends BaseOperation {
  type: 'match';
  operator: keyof Matchers<string>;
  field: string;
  comparator: string | number;
  query: string;
}

export function buildMatchOperation(
  query: Partial<
    Record<keyof Matchers<string>, Record<string, string | number>>
  >
): MatchOperation[] {
  type Pair = [keyof Matchers<string>, Record<string, string | number>];
  const pairs: Pair[] = toPairs(query) as Pair[];
  const toMatchOperations = ([operator, matchers]: Pair): MatchOperation[] =>
    map(
      ([field, comparator]) => ({
        type: 'match',
        operator,
        field,
        comparator,
        query: `'${field}' ${config.operators.match[operator]} '${comparator}'`
      }),
      toPairs(matchers)
    );

  return flatten(map(toMatchOperations)(pairs));
}

export default function explainMatch(operations: MatchOperation[]): string {
  return compose(
    concat('MATCH items in the collection WHERE '),
    join(' AND '),
    reduce<MatchOperation, string[]>(function appendQuery(queries, { query }) {
      return [...queries, query];
    }, [])
  )(operations);
}
