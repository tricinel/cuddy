import { fromPairs, sort, toPairs } from 'ramda';

export default function sortObjPropsBy(
  obj: Record<string, unknown>,
  order: Record<string, number>
): Record<string, unknown> {
  type Pair = [string, unknown];
  return fromPairs(
    sort(function sortStage([a]: Pair, [b]: Pair) {
      return order[a] - order[b];
    })(toPairs(obj))
  );
}
