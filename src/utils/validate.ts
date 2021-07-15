import { difference, join, keys } from 'ramda';
import config from '../config';
import { hasStage } from './guards';
import { validate as validateMatch } from '../stages/match';
import { validate as validatePager } from '../stages/pager';
import { validate as validateCountBy } from '../stages/count';
import { validate as validateGroupBy } from '../stages/group';
import { validate as validateOrderBy } from '../stages/sort';
import { validate as validateFields } from '../stages/fields';
import { validate as validateTransformations } from '../stages/transform';
import type { Stages } from '../types';
import type { LogMessage } from './errors';
import { invalidValue } from './errors';
import combineFields from './combineFields';

// eslint-disable-next-line complexity
export default function validateStages<
  Item,
  TransformedItem extends Item = Item
>(stages: Partial<Stages<TransformedItem>>, item: Item): LogMessage[] {
  const errors: LogMessage[] = [];
  const itemKeys = combineFields(keys(item), keys(stages.transform ?? {}));

  // Check if there are invalid stages

  const stageKeys = keys(stages);
  const invalidStages = difference(stageKeys, config.stages);

  if (invalidStages.length > 0) {
    errors.push(
      invalidValue({
        level: 'warn',
        propPath: 'stages',
        expected: config.stages,
        actual: join(', ', stageKeys)
      })
    );
  }

  if (hasStage(stages.match)) {
    const [invalid, matchErrors] = validateMatch(stages.match, itemKeys);
    invalid && errors.push(...matchErrors);
  }

  if (hasStage(stages.limit)) {
    const [invalid, limitError] = validatePager(stages.limit, 'limit');
    invalid && errors.push(limitError);
  }

  if (hasStage(stages.skip)) {
    const [invalid, skipError] = validatePager(stages.skip, 'skip');
    invalid && errors.push(skipError);
  }

  if (hasStage(stages.orderBy)) {
    const [invalid, orderByErrors] = validateOrderBy(stages.orderBy, itemKeys);
    invalid && errors.push(...orderByErrors);
  }

  if (hasStage(stages.countBy)) {
    const [invalid, countByError] = validateCountBy(stages.countBy, itemKeys);
    invalid && errors.push(countByError);
  }

  if (hasStage(stages.groupBy)) {
    const [invalid, groupByError] = validateGroupBy(stages.groupBy, itemKeys);
    invalid && errors.push(groupByError);
  }

  if (hasStage(stages.fields)) {
    const [invalid, fieldsError] = validateFields(stages.fields, itemKeys);
    invalid && errors.push(fieldsError);
  }

  if (hasStage(stages.transform)) {
    const [invalid, transformErrors] = validateTransformations(
      stages.transform
    );
    invalid && errors.push(...transformErrors);
  }

  return errors;
}
