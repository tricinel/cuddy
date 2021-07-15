import validateStages from '../validate';

interface Item {
  title: string;
  author?: string;
  count: number;
}

const item = {
  title: 'One',
  author: 'Me',
  count: 0
};

test('Validate that the fields stage has only the correct item keys', () => {
  expect(validateStages<Item>({ fields: ['author'] }, item)).toEqual([]);

  expect(
    validateStages<Item>(
      // @ts-expect-error foo and baz shouldn't exist in there
      { fields: ['foo'] },
      item
    )
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'fields' should be one of 'title, author, count'. You passed 'foo'.",
      },
    ]
  `);
});

test('Validate that the match stage has only the correct item keys', () => {
  expect(
    validateStages<Item>({ match: { eq: { title: 'One' } } }, item)
  ).toEqual([]);

  expect(
    validateStages<Item>(
      // @ts-expect-error foo and baz shouldn't exist in there
      { match: { eq: { foo: 'bar', title: 'One' }, gt: { baz: 1 } } },
      item
    )
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "warn",
        "message": "'match.eq.foo' may not exist on the items in your collection.",
      },
      Object {
        "level": "warn",
        "message": "'match.gt.baz' may not exist on the items in your collection.",
      },
    ]
  `);
});

test('Validate that the match stage has the correct value types for certain item keys', () => {
  const valid = {
    gt: { count: 1 },
    lt: { count: 1 },
    gte: { count: 1 },
    lte: { count: 1 },
    in: { title: 'foo' },
    nin: { title: 'foo' },
    eq: { author: 'bar' },
    neq: { author: 'bar' }
  };

  const invalid = {
    gt: { count: 'foo' },
    lt: { count: 'foo' },
    gte: { count: 'foo' },
    lte: { count: 'foo' }
  };

  expect(validateStages<Item>({ match: valid }, item)).toEqual([]);
  // @ts-expect-error invalid should be invalid, duh :)
  expect(validateStages<Item>({ match: invalid }, item)).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'match.gt.count' should be a 'Number'. You passed 'foo'.",
      },
      Object {
        "level": "error",
        "message": "'match.gte.count' should be a 'Number'. You passed 'foo'.",
      },
      Object {
        "level": "error",
        "message": "'match.lt.count' should be a 'Number'. You passed 'foo'.",
      },
      Object {
        "level": "error",
        "message": "'match.lte.count' should be a 'Number'. You passed 'foo'.",
      },
    ]
  `);
});

test('Validate that the orderBy stage has only the correct item keys', () => {
  expect(validateStages<Item>({ orderBy: { title: 'asc' } }, item)).toEqual([]);

  expect(
    validateStages<Item>(
      // @ts-expect-error foo shouldn't exist in there
      { orderBy: { foo: 'asc' } },
      item
    )
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "warn",
        "message": "'orderBy.foo' may not exist on the items in your collection.",
      },
    ]
  `);
});

test('Validate that the orderBy stage has only the asc or desc order for each item key', () => {
  expect(validateStages<Item>({ orderBy: { author: 'desc' } }, item)).toEqual(
    []
  );

  expect(
    validateStages<Item>(
      // @ts-expect-error foo shouldn't exist in there, only asc and desc
      { orderBy: { foo: 'desc', title: 'foo', bar: 'baz' } },
      item
    )
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "warn",
        "message": "'orderBy.foo' may not exist on the items in your collection.",
      },
      Object {
        "level": "warn",
        "message": "'orderBy.bar' may not exist on the items in your collection.",
      },
      Object {
        "level": "error",
        "message": "'orderBy.title' should be one of 'asc, desc'. You passed 'foo'.",
      },
      Object {
        "level": "error",
        "message": "'orderBy.bar' should be one of 'asc, desc'. You passed 'baz'.",
      },
    ]
  `);
});

test('Validate that the limit and skip stages are numbers', () => {
  expect(validateStages<Item>({ limit: 1, skip: 1 }, item)).toEqual([]);

  expect(
    // @ts-expect-error limit should be a number
    validateStages<Item>({ skip: 1, limit: 'foo' }, item)
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'limit' should be a 'Number'. You passed 'foo'.",
      },
    ]
  `);
  expect(
    // @ts-expect-error skip should be a number
    validateStages<Item>({ skip: 'foo', limit: 1 }, item)
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'skip' should be a 'Number'. You passed 'foo'.",
      },
    ]
  `);
  expect(
    // @ts-expect-error both limit and skip should be numbers
    validateStages<Item>({ skip: 'foo', limit: 'bar' }, item)
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'limit' should be a 'Number'. You passed 'bar'.",
      },
      Object {
        "level": "error",
        "message": "'skip' should be a 'Number'. You passed 'foo'.",
      },
    ]
  `);
});

test('Validate that the countBy stage has only the correct item keys', () => {
  expect(validateStages<Item>({ countBy: 'author' }, item)).toEqual([]);
  // @ts-expect-error foo shouldn't exist in there
  expect(validateStages<Item>({ countBy: 'foo' }, item)).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'countBy' should be one of 'title, author, count'. You passed 'foo'.",
      },
    ]
  `);
});

test('Validate that the groupBy stage has only the correct item keys', () => {
  expect(validateStages<Item>({ groupBy: 'author' }, item)).toEqual([]);
  // @ts-expect-error foo shouldn't exist in there
  expect(validateStages<Item>({ groupBy: 'foo' }, item)).toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'groupBy' should be one of 'title, author, count'. You passed 'foo'.",
      },
    ]
  `);
});

test('Validate that the transform stage is of the correct type', () => {
  function always(value: unknown) {
    return function transform(_record: unknown) {
      return value;
    };
  }
  expect(
    validateStages<Item>({ transform: { author: always(true) } }, item)
  ).toEqual([]);
  // @ts-expect-error foo should be an object
  expect(validateStages<Item>({ transform: 'foo' }, item))
    .toMatchInlineSnapshot(`
    Array [
      Object {
        "level": "error",
        "message": "'transform' should be a 'Object'. You passed 'string'.",
      },
    ]
  `);
});
