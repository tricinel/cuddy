import { inc } from '..';

test('Increment a field', () => {
  expect(inc(1, 'count')({ count: 1 })).toEqual(2);
  expect(inc(10, 'count')({ count: 1 })).toEqual(11);
  expect(
    inc<{ count: number; ratings: number }>(
      1,
      'count'
    )({ count: 1, ratings: 0 })
  ).toEqual(2);
});

test('Throw error when the record is missing the property', () => {
  expect(() => {
    // @ts-expect-error Count won't exist on the record
    inc(1, 'ratings')({ count: 1 });
  }).toThrowErrorMatchingInlineSnapshot(
    `"Your record doesn't contain a ratings property!"`
  );
});

test('Throw error when the property is not a number', () => {
  expect(() => {
    inc(1, 'count')({ count: 'a' });
  }).toThrowErrorMatchingInlineSnapshot(
    `"The value should to be a number! You passed string!"`
  );
  expect(() => {
    inc(1, 'count')({ count: ['a'] });
  }).toThrowErrorMatchingInlineSnapshot(
    `"The value should to be a number! You passed object!"`
  );
});
