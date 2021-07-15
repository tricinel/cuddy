import eq from '../matchers/eq';
import neq from '../matchers/neq';
import isIn from '../matchers/in';
import nIn from '../matchers/nin';
import gt from '../matchers/gt';
import lt from '../matchers/lt';
import gte from '../matchers/gte';
import lte from '../matchers/lte';
import { isValidRecord } from '../utils/guards';
import type { LogMessage } from '../utils/errors';
import type { ShapeOf, Matchers, PipelineReduceOnceApplied } from '../types';
import { checkForNumbersOnly, checkKeys } from '../utils/checks';

function checkValues<Item>(ops: Partial<Matchers<keyof Item>>): LogMessage[] {
  const messages: LogMessage[] = [];

  ops.gt && messages.push(...checkForNumbersOnly('match.gt', ops.gt));
  ops.gte && messages.push(...checkForNumbersOnly('match.gte', ops.gte));
  ops.lt && messages.push(...checkForNumbersOnly('match.lt', ops.lt));
  ops.lte && messages.push(...checkForNumbersOnly('match.lte', ops.lte));

  return messages;
}

/*
  We check every op to make sure:
  1. Only the item keys are used, and warn if not
  2. The correct value types for each of the keys is used, and error if not
*/

export function validate<Item>(
  ops: Partial<Matchers<keyof Item>>,
  itemKeys: string[]
): [boolean, LogMessage[]] {
  const invalidKeys = checkKeys('match', ops, itemKeys);
  const invalidValues = checkValues(ops);
  const messages = [...invalidKeys, ...invalidValues];

  return [messages.length > 0, messages];
}

export default function match<
  Item extends ShapeOf<Item>,
  Keys extends string = keyof Item
>(matchers: Partial<Matchers<Keys>>): PipelineReduceOnceApplied<Item>[] {
  const fns: PipelineReduceOnceApplied<Item>[] = [];

  if (isValidRecord<string>(matchers.in)) {
    fns.push(isIn<Item>(matchers.in));
  }

  if (isValidRecord<string>(matchers.nin)) {
    fns.push(nIn<Item>(matchers.nin));
  }

  if (isValidRecord<unknown>(matchers.eq)) {
    fns.push(eq<Item>(matchers.eq));
  }

  if (isValidRecord<unknown>(matchers.neq)) {
    fns.push(neq<Item>(matchers.neq));
  }

  if (isValidRecord<number>(matchers.gt)) {
    fns.push(gt<Item>(matchers.gt));
  }

  if (isValidRecord<number>(matchers.gte)) {
    fns.push(gte<Item>(matchers.gte));
  }

  if (isValidRecord<number>(matchers.lt)) {
    fns.push(lt<Item>(matchers.lt));
  }

  if (isValidRecord<number>(matchers.lte)) {
    fns.push(lte<Item>(matchers.lte));
  }

  return fns;
}
