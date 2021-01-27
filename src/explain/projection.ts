import { compose, concat, map, join, init, last } from 'ramda';
import pluralize from '../utils/pluralize';
import type { BaseOperation } from './query';

// eslint-disable-next-line import/no-unused-modules
export interface ProjectOperation extends BaseOperation {
  type: 'fields';
  projection: string[];
}

export function buildProjectOperation(fields: string[]): ProjectOperation {
  function quoteField(field: string): string {
    return `'${field}'`;
  }

  const firstFields = init(fields);
  const lastField = last(fields) as string;
  const commaSeparatedFields = compose(
    join(', '),
    map(quoteField)
  )(firstFields);

  return {
    type: 'fields',
    projection: fields,
    query:
      fields.length > 1
        ? `${commaSeparatedFields} and ${quoteField(lastField)}`
        : quoteField(fields[0])
  };
}

export default function explainProjection(operation: ProjectOperation): string {
  const count = operation.projection.length;
  const toAppend = `${pluralize(count, 'field')} for each result`;
  return `${concat('ONLY RETURN the ')(operation.query)} ${toAppend}`;
}
