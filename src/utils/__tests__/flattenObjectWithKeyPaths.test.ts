import flattenObjWithKeyPaths from '../flattenObjectWithKeyPaths';

test('Flatten a deep object', () => {
  const toFlatten = { foo: { bar: { baz: 1 } }, fi: { fa: { fo: 'fam' } } };
  expect(flattenObjWithKeyPaths(toFlatten)).toEqual({
    baz: 'foo.bar.baz',
    fo: 'fi.fa.fo'
  });
});

test('Flatten a one level object', () => {
  const toFlatten = { foo: 'bar', baz: 'bar' };
  expect(flattenObjWithKeyPaths(toFlatten)).toEqual({ foo: 'foo', baz: 'baz' });
});
