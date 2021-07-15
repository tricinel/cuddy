import {
  last as end,
  head,
  pipe,
  length as len,
  forEach,
  isEmpty,
  identity
} from 'ramda';
import buildPipeline from './pipeline';
import { assertValidCollection, assertValidStages } from './utils/guards';
import validateStages from './utils/validate';
import log from './utils/log';
import { groupByLevel, joinErrorMessages } from './utils/errors';
import explainPipeline from './explain';
import type { Explanation, Stages, FunnelWithFns } from './types';

function cuddy<Item, TransformedItem extends Item = Item>(
  stages: Partial<Stages<TransformedItem>>,
  collection: Item[]
): FunnelWithFns<TransformedItem> {
  // We use a type alias because it shortens Partial<Item> to just PT
  type Result = Partial<TransformedItem>; // eslint-disable-line

  assertValidStages(stages);
  assertValidCollection(collection);

  const validationMessages = validateStages<Item, TransformedItem>(
    stages,
    collection[0]
  );

  if (validationMessages.length > 0) {
    const { error, info, warn } = groupByLevel(validationMessages);
    !isEmpty(warn) && forEach(log('warn'), warn);
    !isEmpty(info) && forEach(log('info'), info);

    if (error.length > 0) {
      throw new Error(joinErrorMessages(error));
    }
  }

  const explanation: Explanation = explainPipeline<Item, TransformedItem>(
    stages,
    collection
  );
  const fns = buildPipeline<TransformedItem>(stages);

  const aggregate: (xs: Result[]) => Result[] =
    // @ts-expect-error pipe is only typed for up to 10 args
    fns.length > 0 ? pipe<Result[]>(...fns) : pipe(identity);
  const first: (xs: Result[]) => Result = pipe<Result[], Result[], Result>(
    aggregate,
    head
  );
  const last: (xs: Result[]) => Result = pipe<Result[], Result[], Result>(
    aggregate,
    end
  );
  const count = pipe(aggregate, len);

  return {
    aggregate: () => aggregate(collection),
    first: () => first(collection),
    last: () => last(collection),
    count: () => count(collection),
    explain: () => explanation
  };
}

export default cuddy;
