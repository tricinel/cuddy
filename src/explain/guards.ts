import { all, propEq } from 'ramda';
import { isArray } from '../utils/guards';
import type { MatchOperation } from './match';
import type { Operation } from './query';
import type { SkipOperation } from './skip';
import type { LimitOperation } from './limit';
import type { CountByOperation } from './countBy';
import type { ProjectOperation } from './projection';
import type { OrderByOperation } from './orderBy';
import type { GroupByOperation } from './groupBy';
import type { TransformOperation } from './transform';

function isStage(
  stage: string,
  comparator: string,
  query: Operation[]
): boolean {
  return (
    stage === comparator &&
    isArray(query) &&
    all(propEq('type', comparator))(query)
  );
}

export function isMatchStage(
  stage: string,
  query: Operation[]
): query is MatchOperation[] {
  return isStage(stage, 'match', query);
}

export function isSkipStage(
  stage: string,
  query: Operation[]
): query is SkipOperation[] {
  return isStage(stage, 'skip', query);
}

export function isLimitStage(
  stage: string,
  query: Operation[]
): query is LimitOperation[] {
  return isStage(stage, 'limit', query);
}

export function isCountByStage(
  stage: string,
  query: Operation[]
): query is CountByOperation[] {
  return isStage(stage, 'countBy', query);
}

export function isProjectionStage(
  stage: string,
  query: Operation[]
): query is ProjectOperation[] {
  return isStage(stage, 'fields', query);
}

export function isOrderByStage(
  stage: string,
  query: Operation[]
): query is OrderByOperation[] {
  return isStage(stage, 'orderBy', query);
}

export function isGroupByStage(
  stage: string,
  query: Operation[]
): query is GroupByOperation[] {
  return isStage(stage, 'groupBy', query);
}

export function isTransformStage(
  stage: string,
  query: Operation[]
): query is TransformOperation[] {
  return isStage(stage, 'transform', query);
}
