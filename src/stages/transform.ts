import { map, unnest } from 'ramda';
import transformer from '../transform';
import { invalidValue } from '../utils/errors';
import { isObject } from '../utils/guards';
import { checkForFunctionsOnly } from '../utils/checks';
import type {
  Transformations,
  ShapeOf,
  PipelineReduceOnceApplied
} from '../types';
import type { LogMessage } from '../utils/errors';

export function validate<Item>(
  transformations: Transformations<Item>
): [boolean, LogMessage[]] {
  const messages: LogMessage[] = [];

  // Transformations needs to be an object
  if (!isObject(transformations)) {
    messages.push(
      invalidValue({
        propPath: 'transform',
        expected: 'Object',
        actual: typeof transformations
      })
    );
  }

  // Each property of the object needs to be a function
  if (messages.length === 0) {
    const errors = checkForFunctionsOnly('transform', transformations);
    messages.push(...unnest(errors));
  }

  return [messages.length > 0, messages];
}

export default function transform<
  Item extends ShapeOf<Item>,
  TransformedItem extends Item = Item
>(
  transformations: Transformations<Item>
): PipelineReduceOnceApplied<Item, TransformedItem> {
  return map(transformer(transformations));
}
