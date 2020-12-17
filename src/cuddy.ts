import {
  last as end,
  head,
  pipe,
  length as len,
  forEach,
  isEmpty
} from 'ramda';
import buildPipeline from './pipeline';
import { assertValidCollection, assertValidStages } from './utils/guards';
import type { Stages, FunnelWithFns } from './types';
import validateStages from './utils/validate';
import log from './utils/log';
import { groupByLevel, joinErrorMessages } from './utils/errors';

function cuddy<Item = Record<string, unknown>>(
  stages: Partial<Stages<Item>>,
  collection: Item[]
): FunnelWithFns<Item> {
  // We use a type alias because it shortens Partial<Item> to just PT
  type PT = Partial<Item>; // eslint-disable-line

  assertValidStages(stages);
  assertValidCollection(collection);

  const validationMessages = validateStages<Item>(stages, collection[0]);

  if (validationMessages.length > 0) {
    const { error, info, warn } = groupByLevel(validationMessages);
    !isEmpty(warn) && forEach(log('warn'), warn);
    !isEmpty(info) && forEach(log('info'), info);

    if (error.length > 0) {
      throw new Error(joinErrorMessages(error));
    }
  }

  const fns = buildPipeline<PT>(stages);

  // @ts-expect-error pipe is only typed for up to 10 args
  const aggregate: (xs: PT[]) => PT[] = pipe<PT[]>(...fns);
  const first: (xs: PT[]) => PT = pipe<PT[], PT[], PT>(aggregate, head);
  const last: (xs: PT[]) => PT = pipe<PT[], PT[], PT>(aggregate, end);
  const count = pipe(aggregate, len);

  return {
    aggregate: () => aggregate(collection),
    first: () => first(collection),
    last: () => last(collection),
    count: () => count(collection)
  };
}

export default cuddy;
