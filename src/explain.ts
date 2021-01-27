import type { Explanation, Stages } from './types';
import buildQuery from './explain/query';
import summarize from './explain/summary';
import hash from './utils/hash';

export default function explain<Item>(
  stages: Partial<Stages<Item>>,
  collection: Item[]
): Explanation {
  const query = buildQuery(stages);
  const summary = summarize(query);

  const explanation: Explanation = {
    queryHash: hash(JSON.stringify(query)),
    totalOperations: query.length,
    collectionSize: collection.length,
    query,
    summary
  };

  return explanation;
}
