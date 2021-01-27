import sortObjPropsBy from '../sortObjPropsBy';

const orders = { a: 1, b: 2, c: 3 };

test('Sort the properties of an object by a specific order', () => {
  const obj = { b: 'b', a: 'a', c: 'c' };
  expect(sortObjPropsBy(obj, orders)).toEqual({ a: 'a', b: 'b', c: 'c' });
});

test('Sort the known properties and place the others at the end', () => {
  const obj = { x: 'x', b: 'b', y: 'y', a: 'a', c: 'c', d: 'd' };

  expect(sortObjPropsBy(obj, orders)).toEqual({
    a: 'a',
    b: 'b',
    c: 'c',
    x: 'x',
    y: 'y',
    d: 'd'
  });
});
