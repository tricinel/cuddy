import toStringIfNeeded from '../toString';

test("Stringifies a value if it's not already a string or number", () => {
  expect(toStringIfNeeded('a')).toEqual('a');
  expect(toStringIfNeeded(1)).toEqual(1);
  expect(toStringIfNeeded(null)).toEqual('null');
  expect(toStringIfNeeded(undefined)).toEqual('undefined');
  expect(toStringIfNeeded({})).toEqual('{}');
  expect(toStringIfNeeded(true)).toEqual('true');
  expect(toStringIfNeeded([1, 'false', false])).toEqual('[1, "false", false]');
  expect(toStringIfNeeded([NaN, null, Infinity])).toEqual(
    '[NaN, null, Infinity]'
  );
  expect(toStringIfNeeded({ x: 5 })).toEqual('{"x": 5}');
  expect(toStringIfNeeded({ x: { y: 5 } })).toEqual('{"x": {"y": 5}}');
});
