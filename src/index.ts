import { isNil } from 'ramda';
import _cuddy from './cuddy';
import type { Stages, FunnelWithFns } from './types';

type Funnel<Item> =
  | ((collection: Item[]) => FunnelWithFns<Item>)
  | FunnelWithFns<Item>;

function cuddy<Item, TransformedItem extends Item = Item>(
  stages: Partial<Stages<TransformedItem>>,
  collection: Item[]
): FunnelWithFns<TransformedItem>;

function cuddy<Item, TransformedItem extends Item = Item>(
  stages: Partial<Stages<TransformedItem>>
): (collection: Item[]) => FunnelWithFns<TransformedItem>;

function cuddy<Item, TransformedItem extends Item = Item>(
  stages: Partial<Stages<TransformedItem>>,
  collection?: Item[]
): Funnel<TransformedItem> {
  return isNil(collection)
    ? // eslint-disable-next-line @typescript-eslint/no-shadow
      (collection: Item[]): FunnelWithFns<TransformedItem> =>
        _cuddy<Item, TransformedItem>(stages, collection)
    : _cuddy<Item, TransformedItem>(stages, collection);
}

export default cuddy;
