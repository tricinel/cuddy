import { compose, reject, isNil, flatten, uniq } from 'ramda';

export default function combineFields(...fields: string[][]): string[] {
  return compose<string[][], string[], string[], string[]>(
    reject<string>(isNil),
    uniq,
    flatten
  )(fields);
}
