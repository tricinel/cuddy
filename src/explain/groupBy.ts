import { concat } from 'ramda';
import type { BaseOperation } from './query';

// eslint-disable-next-line import/no-unused-modules
export interface GroupByOperation extends BaseOperation {
  type: 'groupBy';
  field: string;
}

export function buildGroupByOperation(field: string): GroupByOperation {
  return {
    type: 'groupBy',
    field,
    query: `'${field}'`
  };
}

export default function explainGroupBy(operation: GroupByOperation): string {
  return concat('GROUP the results BY ')(operation.query);
}
