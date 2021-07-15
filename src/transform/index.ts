import { mapObjIndexed, mergeRight, compose } from 'ramda';
import type { Transformations } from '../types';

export default function transformer<
  Item extends Record<string, unknown>,
  TransformedItem extends Item = Item
>(
  transformations: Transformations<TransformedItem>
): (record: Item) => TransformedItem {
  function valueOrTransform(
    value: unknown,
    key: keyof TransformedItem,
    item: TransformedItem | undefined
  ): unknown {
    const { [key]: transform } = transformations;
    if (typeof transform === 'undefined' || typeof item === 'undefined') {
      return value;
    }

    // We set the new value on the item directly, so that future transformations can use it
    // @ts-expect-error transform returns unknown and TS complains that you can't set item[key] to unknown
    item[key] = transform(item); // eslint-disable-line no-param-reassign

    // We also return the new value
    return item[key];
  }

  // @ts-expect-error I give up, I can't make this overload work :(
  return compose(mapObjIndexed(valueOrTransform), mergeRight(transformations));
}
