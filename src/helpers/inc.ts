import { add, prop } from 'ramda';
import { assertIsNumber, assertIsDefined } from '../utils/guards';

export default function inc<Item>(
  byValue: number,
  field: keyof Item
): (record: Item) => number {
  return function transform(record: Item): number {
    const value = prop(field, record);
    assertIsDefined(value, `Your record doesn't contain a ${field} property!`);
    assertIsNumber(value);
    return add(byValue, value);
  };
}
