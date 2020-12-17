import {
  compose,
  ifElse,
  anyPass,
  is,
  identity,
  toString as stringify
} from 'ramda';

const toStringIfNeeded: (value: unknown) => string = compose(
  ifElse(anyPass([is(String), is(Number)]), identity, stringify)
);

export default toStringIfNeeded;
