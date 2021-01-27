import { concat } from 'ramda';
import pluralize from '../utils/pluralize';
import type { BaseOperation } from './query';

// eslint-disable-next-line import/no-unused-modules
export interface LimitOperation extends BaseOperation {
  type: 'limit';
  count: number;
}

export function buildLimitOperation(count: number): LimitOperation {
  return {
    type: 'limit',
    count,
    query: `${count} ${pluralize(count, 'result')}`
  };
}

export default function explainLimit(operation: LimitOperation): string {
  return concat('LIMIT to maximum ')(operation.query);
}
