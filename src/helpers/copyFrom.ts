import { prop } from 'ramda';
import { assertIsDefined } from '../utils/guards';

export default function copyFrom<Item>(
  field: keyof Item
): (record: Item) => unknown {
  return function transform(record: Item): unknown {
    const value = prop(field, record);
    assertIsDefined(value, `Your record doesn't contain a ${field} property!`);
    return value;
  };
}
