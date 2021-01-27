import { compose, concat, join, map, pluck, toPairs } from 'ramda';
import config from '../config';
import type { SortOrder } from '../types';
import type { BaseOperation } from './query';

// eslint-disable-next-line import/no-unused-modules
export interface OrderByOperation extends BaseOperation {
  type: 'orderBy';
  field: string;
  order: 'asc' | 'desc';
}

export function buildOrderByOperation(
  query: Record<string, SortOrder>
): OrderByOperation[] {
  type Pair = [string, SortOrder];
  const pairs: Pair[] = toPairs(query) as Pair[];

  function toOrderByOperations([field, order]: Pair): OrderByOperation {
    return {
      type: 'orderBy',
      field,
      order,
      query: `'${field}' ${config.operators.orderBy[order]}`
    };
  }

  return map(toOrderByOperations)(pairs);
}

export default function explainOrderBy(operations: OrderByOperation[]): string {
  const queries = pluck('query')(operations);
  return compose(concat('ORDER the results BY '), join(' AND '))(queries);
}
