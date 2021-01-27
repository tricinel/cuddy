import { concat } from 'ramda';
import pluralize from '../utils/pluralize';
import type { BaseOperation } from './query';

// eslint-disable-next-line import/no-unused-modules
export interface SkipOperation extends BaseOperation {
  type: 'skip';
  count: number;
}

export function buildSkipOperation(count: number): SkipOperation {
  return {
    type: 'skip',
    count,
    query: `${count} ${pluralize(count, 'result')}`
  };
}

export default function explainSkip(operation: SkipOperation): string {
  return concat('SKIP the first ')(operation.query);
}
