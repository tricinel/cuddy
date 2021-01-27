/* eslint-disable import/no-unused-modules */
import { toPairs, reduce } from 'ramda';
import config from '../config';
import { buildMatchOperation } from './match';
import { buildSkipOperation } from './skip';
import { buildCountByOperation } from './countBy';
import { buildLimitOperation } from './limit';
import { buildProjectOperation } from './projection';
import { buildOrderByOperation } from './orderBy';
import { buildGroupByOperation } from './groupBy';
import { buildTransformOperation } from './transform';
import sortObjPropsBy from '../utils/sortObjPropsBy';
import type { Transformations, Stages, Matchers, SortOrder } from '../types';
import type { MatchOperation } from './match';
import type { SkipOperation } from './skip';
import type { LimitOperation } from './limit';
import type { CountByOperation } from './countBy';
import type { ProjectOperation } from './projection';
import type { OrderByOperation } from './orderBy';
import type { GroupByOperation } from './groupBy';
import type { TransformOperation } from './transform';

export interface BaseOperation {
  query: string;
}

export type Operation =
  | MatchOperation
  | TransformOperation
  | LimitOperation
  | SkipOperation
  | ProjectOperation
  | CountByOperation
  | GroupByOperation
  | OrderByOperation;

export default function buildQuery<Item extends Record<string, unknown>>(
  stages: Partial<Stages<Item>>
): Operation[] {
  type Pair = [keyof Stages<Item>, unknown];
  function toQueryReducer(
    operations: Operation[],
    [stage, query]: Pair
  ): Operation[] {
    switch (stage) {
      case 'match': {
        // eslint-disable-next-line no-param-reassign
        operations = [
          ...operations,
          ...buildMatchOperation(
            query as Record<
              keyof Matchers<string>,
              Record<string, string | number>
            >
          )
        ];
        break;
      }
      case 'transform': {
        // eslint-disable-next-line no-param-reassign
        operations = [
          ...operations,
          ...buildTransformOperation(
            query as Record<
              keyof Transformations<string>,
              Record<string, unknown>
            >
          )
        ];
        break;
      }
      case 'countBy': {
        // eslint-disable-next-line no-param-reassign
        operations = [...operations, buildCountByOperation(query as string)];
        break;
      }
      case 'groupBy': {
        // eslint-disable-next-line no-param-reassign
        operations = [...operations, buildGroupByOperation(query as string)];
        break;
      }
      case 'fields': {
        // eslint-disable-next-line no-param-reassign
        operations = [...operations, buildProjectOperation(query as string[])];
        break;
      }
      case 'limit': {
        // eslint-disable-next-line no-param-reassign
        operations = [...operations, buildLimitOperation(query as number)];
        break;
      }
      case 'skip': {
        // eslint-disable-next-line no-param-reassign
        operations = [...operations, buildSkipOperation(query as number)];
        break;
      }
      case 'orderBy': {
        // eslint-disable-next-line no-param-reassign
        operations = [
          ...operations,
          ...buildOrderByOperation(query as Record<string, SortOrder>)
        ];
        break;
      }
      default:
        break;
    }

    return operations;
  }

  const orderedStages = sortObjPropsBy(stages, config.stageOrder);
  return reduce(toQueryReducer, [])(toPairs(orderedStages) as Pair[]);
}
