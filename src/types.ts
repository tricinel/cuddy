/* eslint-disable import/no-unused-modules, @typescript-eslint/no-type-alias */

import type { Operation } from './explain/query';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type InferRecord<T, K = unknown> = Record<keyof T, K>;
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

export interface Transformations<Keys extends string> {
  inc: Partial<Record<Keys, number>>;
  dec: Partial<Record<Keys, number>>;
  set: Partial<Record<Keys, unknown>>;
  alias: Partial<Record<Keys, string>>;
}

interface MatchStage<Keys extends string> {
  match: Partial<Matchers<Keys>>;
}

interface TransformStage<Keys extends string> {
  transform: Partial<Transformations<Keys>>;
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

export type Stages<T, Keys extends string = keyof T> = MatchStage<Keys> &
  TransformStage<Keys> &
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

export type PipelineReduceOnceApplied<Item = Record<string, unknown>> = (
  collection: readonly Item[]
) => Item[];

export type PipelineCountOnceApplied<Item = Record<string, unknown>> = (
  collection: readonly Item[]
) => Record<string, number>;

export type PipelineGroupOnceApplied<Item = Record<string, unknown>> = (
  collection: readonly Item[]
) => Record<string, Item[]>;

export type PipelineReduceGroupOnceApplied<Item = Record<string, unknown>> = (
  groupedCollection: Record<keyof Item, readonly Item[]>
) => Record<string, Item[]>;

export type PipelineTransformOnceApplied<Item = Record<string, unknown>> = (
  collection: readonly Item[]
) => Record<string, unknown>[];

export type PipelineDefaultOnceApplied<Collection> = (
  collection: Collection
) => Collection;

export type PipelineFn<Item> =
  | PipelineCountOnceApplied<Item>
  | PipelineGroupOnceApplied<Item>
  | PipelineTransformOnceApplied<Item>
  | PipelineReduceOnceApplied<Item>
  | PipelineReduceGroupOnceApplied<Item>
  | PipelineDefaultOnceApplied<Item>;

export type Pipeline<T> = () => FunnelWithFns<T>;
export type PipelineNoCollection<T> = (collection: T[]) => FunnelWithFns<T>;
