import { compose, join, keys, map, mergeAll, split } from 'ramda';
import flattenObj from './flattenObject';

function toObj(keysList: string[]): Record<string, unknown> {
  return mergeAll(
    map(
      compose((ks) => ({ [ks[ks.length - 1]]: join('.', ks) }), split('.')),
      keysList
    )
  );
}

/*
We transform a deep object such as:
  { eq: { foo: 'bar', title: 'One' }, gt: { baz: 1 } }
to a flat object where the keys are the keys of the end nodes and the value is the path to that node
such as:
  { foo: 'eq.foo', title: 'eq.title', baz: 'gt.baz' }
*/
export default function flattenObjWithKeyPaths(
  obj: Record<string, unknown>
): Record<string, unknown> {
  return compose(toObj, keys, flattenObj)(obj);
}
