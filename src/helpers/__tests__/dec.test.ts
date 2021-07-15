import { dec } from '..';

test('Decrement a field', () => {
  expect(dec(1, 'count')({ count: 2 })).toEqual(1);
  expect(dec(1, 'count')({ count: 10 })).toEqual(9);
  expect(
    dec<{ count: number; ratings: number }>(
      1,
      'count'
    )({ count: 10, ratings: 0 })
  ).toEqual(9);
});

test('Throw error when the record is missing the property', () => {
  expect(() => {
    // @ts-expect-error Count won't exist on the record
    dec(1, 'ratings')({ count: 1 });
  }).toThrowErrorMatchingInlineSnapshot(
    `"Your record doesn't contain a ratings property!"`
  );
});

test('Throw error when the property is not a number', () => {
  expect(() => {
    dec(1, 'count')({ count: 'a' });
  }).toThrowErrorMatchingInlineSnapshot(
    `"The value should to be a number! You passed string!"`
  );
  expect(() => {
    dec(1, 'count')({ count: ['a'] });
  }).toThrowErrorMatchingInlineSnapshot(
    `"The value should to be a number! You passed object!"`
  );
});
