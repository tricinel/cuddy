import { isNil } from 'ramda';
import _cuddy from './cuddy';
import type { Stages, FunnelWithFns } from './types';

type Funnel<Item> =
  | ((collection: Item[]) => FunnelWithFns<Item>)
  | FunnelWithFns<Item>;

function cuddy<Item = Record<string, unknown>>(
  stages: Partial<Stages<Item>>,
  collection: Item[]
): FunnelWithFns<Item>;

function cuddy<Item>(
  stages: Partial<Stages<Item>>
): (collection: Item[]) => FunnelWithFns<Item>;

function cuddy<Item = Record<string, unknown>>(
  stages: Partial<Stages<Item>>,
  collection?: Item[]
): Funnel<Item> {
  return isNil(collection)
    ? // eslint-disable-next-line @typescript-eslint/no-shadow
      (collection: Item[]): FunnelWithFns<Item> =>
        _cuddy<Item>(stages, collection)
    : _cuddy<Item>(stages, collection);
}

export default cuddy;
