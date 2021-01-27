import hash from '../hash';

test('Hash the string', () => {
  expect(hash('test')).toMatchInlineSnapshot(`"skkcyc"`);
  expect(hash('')).toMatchInlineSnapshot(`"0"`);
});

test('Hash an object', () => {
  expect(hash(JSON.stringify({}))).toMatchInlineSnapshot(`"1d8ny0s"`);
  expect(
    hash(JSON.stringify({ match: { in: { author: 'John' } } }))
  ).toMatchInlineSnapshot(`"1eg7uko"`);
  expect(
    hash(
      JSON.stringify({
        match: {
          in: { author: 'John' },
          fields: ['author', 'title'],
          countBy: 'ratings'
        }
      })
    )
  ).toMatchInlineSnapshot(`"ywt8bw"`);
});
