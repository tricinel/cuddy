/* eslint-disable import/no-unused-modules, @typescript-eslint/no-type-alias */

import type { Operation } from './explain/query';

export type ExtendedItem<BaseItem, TransformedItem> = {
  [K in keyof BaseItem | keyof TransformedItem]: K extends keyof TransformedItem
    ? TransformedItem[K]
    : K extends keyof BaseItem
    ? BaseItem[K]
    : never;
};
export type ShapeOf<Item> = { [K in keyof Item]: Item[K] };

export type SortOrder = 'asc' | 'desc';
export type Sort<Keys extends string> = Partial<Record<Keys, SortOrder>>;

export interface Matchers<Keys extends string> {
  eq: Partial<Record<Keys, unknown>>;
  neq: Partial<Record<Keys, unknown>>;
  in: Partial<Record<Keys, string>>;
  nin: Partial<Record<Keys, string>>;
  gt: Partial<Record<Keys, number>>;
  lt: Partial<Record<Keys, number>>;
  gte: Partial<Record<Keys, number>>;
  lte: Partial<Record<Keys, number>>;
}

interface MatchStage<Keys extends string> {
  match: Partial<Matchers<Keys>>;
}

interface CountByStage<Keys extends string> {
  countBy: Keys;
}

interface GroupByStage<Keys extends string> {
  groupBy: Keys;
}

interface OrderByStage<Keys extends string> {
  orderBy: Sort<Keys>;
}

interface FieldsStage<Keys extends string> {
  fields: Keys[];
}

interface LimitStage {
  limit: number;
}

interface SkipStage {
  skip: number;
}

export type Transform<Item> = (record: Item) => unknown;
export type Transformations<Item> = Record<string, Transform<Item>>;

interface TransformStage<Item> {
  transform: Transformations<Item>;
}

export type Stages<T, Keys extends string = keyof T> = MatchStage<Keys> &
  TransformStage<T> &
  CountByStage<Keys> &
  GroupByStage<Keys> &
  OrderByStage<Keys> &
  FieldsStage<Keys> &
  LimitStage &
  SkipStage;

export interface Explanation {
  queryHash: string;
  totalOperations: number;
  collectionSize: number;
  query: Operation[];
  summary: string;
}

export interface FunnelWithFns<T, Picked = Partial<T>> {
  aggregate: () => Picked[];
  first: () => Picked;
  last: () => Picked;
  count: () => number;
  explain: () => Explanation;
}

export type PipelineReduceOnceApplied<
  Item,
  TransformedItem extends Item = Item
> = (collection: readonly Item[]) => TransformedItem[];

export type PipelineCountOnceApplied<Item> = (
  collection: readonly Item[]
) => Record<string, number>; // All keys are coerced to strings because of how JavaScript objects work

export type PipelineGroupOnceApplied<
  Item,
  TransformedItem extends Item = Item
> = (
  collection: readonly Item[]
) => Record<keyof TransformedItem, TransformedItem[]>;

export type PipelineReduceGroupOnceApplied<TransformedItem> = (
  groupedCollection: Record<keyof TransformedItem, readonly TransformedItem[]>
) => Record<string, TransformedItem[]>;

// export type PipelineTransformOnceApplied<
//   Item,
//   TransformedItem extends Item = Item
// > = (collection: readonly Item[]) => TransformedItem[];

export type PipelineDefaultOnceApplied<Collection> = (
  collection: Collection
) => Collection;

// export type PipelineFn<Stages, Item, TransformedItem extends Item = Item> = Stages extends CountByStage<keyof TransformedItem> ? PipelineCountOnceApplied<Item, TransformedItem> : Stages extends GroupByStage<keyof TransformedItem> ? PipelineGroupOnceApplied<Item, TransformedItem> : PipelineReduceOnceApplied<Item, TransformedItem>;

export type PipelineFn<Item, TransformedItem extends Item = Item> =
  | PipelineCountOnceApplied<TransformedItem>
  | PipelineGroupOnceApplied<Item, TransformedItem>
  | PipelineReduceOnceApplied<Item, TransformedItem>
  | PipelineReduceGroupOnceApplied<Item>;

export type Pipeline<T> = () => FunnelWithFns<T>;
export type PipelineNoCollection<T> = (collection: T[]) => FunnelWithFns<T>;
