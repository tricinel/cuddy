import {
  map,
  compose,
  mapObjIndexed,
  has,
  invertObj,
  keys,
  mergeWith,
  prop,
  omit
} from 'ramda';
import type { PipelineTransformOnceApplied } from '../types';

export default function alias<T>(
  pairs: Record<string, string>
): PipelineTransformOnceApplied<T> {
  const invertedPairs = invertObj(pairs);

  return map(
    compose(
      omit(keys(pairs)),
      mapObjIndexed((valueOrOldKey, key, item) =>
        typeof valueOrOldKey === 'string' && has(key, invertedPairs)
          ? (item as Record<string, unknown>)[valueOrOldKey]
          : (item as Record<string, unknown>)[key]
      ),
      mergeWith(prop, invertObj(pairs))
    )
  );
}
