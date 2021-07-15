import { prop, ascend, descend, sortWith, includes, isEmpty } from 'ramda';
import type {
  ShapeOf,
  PipelineReduceOnceApplied,
  Sort,
  SortOrder
} from '../types';
import { diff } from '../utils/diff';
import { toInvalidProps, toInvalidValues } from '../utils/errors';
import type { LogMessage } from '../utils/errors';

/*
  The orderBy object is of this shape: { foo: 'bar', title: 'baz' } and we need to check:
  1. warn if any of the keys ['foo', 'title'] don't exist in the itemKeys
  2. error if any of the values ['bar', 'baz'] are not in ['asc', 'desc']

  For both, construct the path with the prefix `orderBy`, for example:
  - `orderBy.foo`
  - `orderBy.baz`
*/
export function validate<Item>(
  orderBy: Partial<Record<keyof Item, SortOrder>>,
  itemKeys: string[]
): [boolean, LogMessage[]] {
  const sortOrders: SortOrder[] = ['asc', 'desc'];
  const keyNotIn = (key: string): boolean => !includes(key, itemKeys);
  const valueNotIn = (_key: string, value: string): boolean =>
    !includes(value, sortOrders);
  const errors: LogMessage[] = [];

  const invalidValues = diff(valueNotIn, orderBy);
  const invalidKeys = diff(keyNotIn, orderBy);

  if (!isEmpty(invalidKeys)) {
    errors.push(...toInvalidProps('orderBy.', invalidKeys));
  }

  if (!isEmpty(invalidValues)) {
    errors.push(...toInvalidValues('orderBy.', sortOrders, invalidValues));
  }

  return [errors.length > 0, errors];
}

export default function order<Item extends ShapeOf<Item>>(
  orderBy: Sort<keyof Item>
): PipelineReduceOnceApplied<Item> {
  return sortWith(
    Object.entries(orderBy).map(([field, sortOrder]) =>
      sortOrder === 'asc' ? ascend(prop(field)) : descend(prop(field))
    )
  );
}
