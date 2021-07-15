import { concat } from 'ramda';
import type { BaseOperation } from './query';

// eslint-disable-next-line import/no-unused-modules
export interface CountByOperation extends BaseOperation {
  type: 'countBy';
  field: string;
}

export function buildCountByOperation(field: string): CountByOperation {
  return {
    type: 'countBy',
    field,
    query: `'${field}'`
  };
}

export default function explainLimit(operation: CountByOperation): string {
  return concat('COUNT the results BY ')(operation.query);
}
