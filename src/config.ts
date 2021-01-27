import type { Stages } from './types';

const stages = [
  'match',
  'limit',
  'skip',
  'limit',
  'orderBy',
  'countBy',
  'groupBy',
  'fields',
  'transform'
];

const stageOrder: Record<keyof Stages<never>, number> = {
  match: 1,
  orderBy: 2,
  fields: 3,
  transform: 4,
  skip: 5,
  limit: 6,
  groupBy: 7,
  countBy: 8
};

const operators = {
  match: {
    eq: 'is',
    neq: 'is not',
    gt: 'is greater than',
    gte: 'is greater than or equal to',
    lt: 'is lower than',
    lte: 'is lower than or equal to',
    in: 'contains',
    nin: 'does not contain'
  },
  transform: {
    alias: (field: string): string => `RENAME '${field}' to`,
    inc: (field: string): string => `INCREMENT '${field}' by`,
    dec: (field: string): string => `DECREMENT '${field}' by`,
    set: (field: string): string => `SET '${field}' to`
  },
  orderBy: {
    asc: 'from lowest to highest',
    desc: 'from highest to lowest'
  }
};

const config = { stages, operators, stageOrder };

export default config;
