import pluralize from '../pluralize';

test('Pluralize words', () => {
  expect(pluralize(0, 'item')).toEqual('no items');
  expect(pluralize(1, 'item')).toEqual('item');
  expect(pluralize(10, 'item')).toEqual('items');

  expect(pluralize(0, 'result')).toEqual('no results');

  // @ts-expect-error thing shouldn't exist in the dictionary
  expect(pluralize(0, 'thing')).toEqual('thing');
});
