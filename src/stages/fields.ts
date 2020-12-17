import { mapObjIndexed, project, join, difference } from 'ramda';
import type {
  InferRecord,
  PipelineReduceGroupOnceApplied,
  PipelineReduceOnceApplied
} from '../types';
import { invalidValue } from '../utils/errors';
import type { LogMessage } from '../utils/errors';

export function validate(
  fields: string[],
  itemKeys: string[]
): [boolean, LogMessage] {
  const invalidValues = difference(fields, itemKeys);

  return [
    invalidValues.length > 0,
    invalidValue({
      propPath: 'fields',
      expected: itemKeys,
      actual: join(', ', fields)
    })
  ];
}

export function pickFields<Item extends InferRecord<Item>>(
  fields: string[]
): PipelineReduceOnceApplied<Item> {
  return project(fields);
}

export function pickFieldsWhenGrouped<Item extends InferRecord<Item>>(
  fields: string[]
): PipelineReduceGroupOnceApplied<Item> {
  return mapObjIndexed(pickFields<Item>(fields));
}
