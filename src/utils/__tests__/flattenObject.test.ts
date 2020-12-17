import flattenObj from '../flattenObject';

test('Flatten a deep object', () => {
  const toFlatten = { foo: { bar: { baz: 1 } }, fi: { fa: { fo: 'fam' } } };
  expect(flattenObj(toFlatten)).toEqual({
    'foo.bar.baz': 1,
    'fi.fa.fo': 'fam'
  });
});

test('Flatten a one level object', () => {
  const toFlatten = { foo: 'bar', baz: 'bar' };
  expect(flattenObj(toFlatten)).toEqual(toFlatten);
});
