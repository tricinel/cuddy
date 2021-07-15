import {
  compose,
  ifElse,
  anyPass,
  is,
  identity,
  toString as stringify
} from 'ramda';

export default compose<unknown, string>(
  ifElse(anyPass([is(String), is(Number)]), identity, stringify)
);
