import { copyFrom } from '..';

test('Set the value of a field', () => {
  expect(copyFrom('count')({ count: 1 })).toEqual(1);
  expect(copyFrom('name')({ name: 'xyz' })).toEqual('xyz');
});

test('Throw error when the record is missing the property', () => {
  expect(() => {
    // @ts-expect-error Count won't exist on the record
    copyFrom('ratings')({ count: 1 });
  }).toThrowErrorMatchingInlineSnapshot(
    `"Your record doesn't contain a ratings property!"`
  );
});
