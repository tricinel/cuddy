import { set } from '..';

test('Set the value of a field', () => {
  expect(set(10)({ count: 1 })).toEqual(10);
  expect(set('abc')({ name: 'xyz' })).toEqual('abc');
});
