/* eslint-disable import/no-unused-modules, @typescript-eslint/no-type-alias */
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

export interface FunnelWithFns<T, Picked = Partial<T>> {
  aggregate: () => Picked[];
  first: () => Picked;
  last: () => Picked;
  count: () => number;
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

// eslint-disable-next-line capitalized-comments
// type TransformationOperations = keyof Transformations<string>;
// type MatcherOperations = keyof Matchers<string>;
// prettier-ignore
// type PipelineFn<
//   PipelineStages,
//   Item extends Record<string, unknown>
// > =
//   /*
//    * We check all the conditions in sequence, since the shape of the result changes based on what the user is doing
//    * The user can 1. count, 2. group, 3. transform 4. everything else
//   */

//   PipelineStages extends CountByStage<keyof Item>
//   /*
//    * There is { countBy: 'key' } stage, so we are counting
//    * This means we will accept an Item[] and return a Record<string, number>
//    * by transforming [{ key1: value1 }, { key2: value2 }] to { key1: number, key2: number }
//    * For example:
//    * With the input of data = [{ name: 'John' }, { name: 'John' }, { name: 'Jane' }]
//    * we get the output of { 'John': 2, 'Jane': 1 }
//   */
//   ? PipelineCountOnceApplied<Item>

//   : PipelineStages extends GroupByStage<keyof Item>
//   /*
//    * There is { groupBy: 'key' } stage, so we are grouping
//    * This means we will accept an Item[] and return a Record<string, Item[]>
//    * by transforming [{ key1: value1 }, { key2: value2 }] to { key1: [{ key1: value1 }], key2: [{ key2: value2 }] }
//    * For example:
//    * With the input of data = [{ name: 'John' }, { name: 'John' }, { name: 'Jane' }]
//    * we get the output of { 'John': [{ name: 'John' }, { name: 'John' }], 'Jane': [{ name: 'Jane' }] }
//   */
//   ? PipelineGroupOnceApplied<Item>

//   : PipelineStages extends TransformStage<keyof Item>
//   /*
//    * There is { transform: ... } stage, so we are potentially modifying the shape of the results
//    * This means we will accept an Item[] and return a Record<string, unknown>[]
//    * An example that changes the shape is:
//    * With the input of data = [{ name: 'John' }, { name: 'Jane' }]
//    * and the transform { name: 'firstName' }
//    * we get the output of [{ firstName: 'John' }, { firstName: 'Jane' }]
//    * Another example that doesn't change the shape is:
//    * With the input of data = [{ total: 1 }, { total: 3 }]
//    * and the transform { inc: [ 'total': 10 ] }
//    * we get the output of [{ total: 11 }, { total: 13 }]
//   */
//   ? PipelineTransformOnceApplied<Item>

//   : PipelineStages extends MatchStage<keyof Item>
//   /*
//    * There is { match: ... } stage, so we are filtering
//    * This means we will accept an Item[] and return a filtered Item[]
//   */
//   ? PipelineReduceOnceApplied<Item>

//   : PipelineStages extends FieldsStage<keyof Item>
//   /*
//    * There is { fields: [...] } stage, so we are picking only some of the keys from each Item
//    * This means we will accept an Item[] and return a NewItem[] where NewItem extends Item
//   */
//   ? PipelineReduceOnceApplied<Item>

//   /*
//    * Otherwise, we don't know what we'll return
//   */
//   : never;

// function cuddy<Item>(
//   stages: Partial<Stages<Item>>,
//   collection: Item[]
// ): FunnelWithFns<Item>;
// function cuddy<Item>(
//   stages: Partial<Stages<Item>>
// ): (collection: Item[]) => FunnelWithFns<Item>;
