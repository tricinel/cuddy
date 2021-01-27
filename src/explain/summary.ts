import { groupBy, prop, compose, reduce, keys } from 'ramda';
import explainMatch from './match';
import explainSkip from './skip';
import explainLimit from './limit';
import explainCountBy from './countBy';
import explainProjection from './projection';
import explainOrderBy from './orderBy';
import explainGroupBy from './groupBy';
import explainTransform from './transform';
import {
  isMatchStage,
  isSkipStage,
  isLimitStage,
  isCountByStage,
  isProjectionStage,
  isOrderByStage,
  isGroupByStage,
  isTransformStage
} from './guards';
import type { Operation } from './query';

function explainStage(stage: string, operations: Operation[]): string {
  if (isMatchStage(stage, operations)) {
    return explainMatch(operations);
  }

  if (isSkipStage(stage, operations)) {
    return explainSkip(operations[0]);
  }

  if (isLimitStage(stage, operations)) {
    return explainLimit(operations[0]);
  }

  if (isCountByStage(stage, operations)) {
    return explainCountBy(operations[0]);
  }

  if (isProjectionStage(stage, operations)) {
    return explainProjection(operations[0]);
  }

  if (isOrderByStage(stage, operations)) {
    return explainOrderBy(operations);
  }

  if (isGroupByStage(stage, operations)) {
    return explainGroupBy(operations[0]);
  }

  if (isTransformStage(stage, operations)) {
    return explainTransform(operations);
  }

  return '';
}

export default function summarize(query: Operation[]): string {
  // Group all operations by type so that we have a bunch of matches, orders, transformations, etc
  const groupedOperations = groupBy<Operation>(prop('type'), query);

  return compose(
    reduce(function withStageSummary(summary, stage) {
      const stageExplanation = explainStage(stage, groupedOperations[stage]);
      return `${summary}${summary.length > 0 ? '. ' : ''}${stageExplanation}`;
    }, ''),
    keys
  )(groupedOperations);
}
