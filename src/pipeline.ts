import { keys } from 'ramda';
import type { Stages, PipelineFn } from './types';
import matchFns from './stages/match';
import order from './stages/sort';
import segment from './stages/pager';
import group from './stages/group';
import count from './stages/count';
import transform from './stages/transform';
import { pickFields, pickFieldsWhenGrouped } from './stages/fields';
import { hasStage, hasFieldsStage } from './utils/guards';
import combineFields from './utils/combineFields';

// eslint-disable-next-line complexity
export default function buildPipeline<Item>(
  stages: Partial<Stages<Item>>
): PipelineFn<Item>[] {
  const fns: PipelineFn<Item>[] = [];
  const selectedFields = combineFields(
    stages.fields ?? [],
    keys(stages.transform ?? {})
  );

  if (hasStage(stages.match)) {
    fns.push(...matchFns<Item>(stages.match));
  }

  if (hasStage(stages.transform)) {
    fns.push(transform(stages.transform));
  }

  if (hasStage(stages.orderBy)) {
    fns.push(order(stages.orderBy));
  }

  if (hasStage(stages.limit) || hasStage(stages.skip)) {
    const skip = hasStage(stages.skip) ? stages.skip : 0;
    const limit = hasStage(stages.limit) ? stages.limit : Infinity;
    fns.push(segment<Item>({ skip, limit }));
  }

  if (hasStage(stages.groupBy)) {
    fns.push(group(stages.groupBy));
  }

  if (hasStage(stages.countBy)) {
    // If we are counting, we don't need to project
    fns.push(count<Item>(stages.countBy));
  }

  // If we are not counting, we might be grouping and/or projecting
  if (
    !hasStage(stages.countBy) &&
    hasStage(stages.groupBy) &&
    hasFieldsStage(stages.fields)
  ) {
    fns.push(pickFieldsWhenGrouped(selectedFields));
  }

  if (
    !hasStage(stages.countBy) &&
    !hasStage(stages.groupBy) &&
    hasStage(stages.fields)
  ) {
    fns.push(pickFields(selectedFields));
  }

  return fns.length > 0 ? fns : [];
}
