import { chain, map, toPairs, fromPairs } from 'ramda';
import { isObject } from './guards';

/*
We transform a deep object such as:
  { eq: { foo: 'bar', title: 'One' }, gt: { baz: 1 } }
to a flat object where the keys are the paths to the end nodes and the values are the values at that path
such as:
  { 'eq.foo': 'bar', 'eq.title': 'One', 'gt.baz': 1 }
*/
export default function flattenObj(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const toPairsDeep = (o: Record<string, unknown>): [string, unknown][] =>
    chain(
      ([key, value]) =>
        isObject(value)
          ? map(
              ([innerKey, innerValue]) => [`${key}.${innerKey}`, innerValue],
              toPairsDeep(value)
            )
          : [[key, value]],
      toPairs(o)
    );

  return fromPairs(toPairsDeep(obj));
}
