import cuddy from '../cuddy';

describe('Wrong data type for collection', () => {
  test.each([
    ['null', null],
    ['number', 42],
    ['string', 'foo'],
    ['object', {}],
    ['undefined', undefined]
  ])('Throws when the collection is %s', (_desc, collection) => {
    expect(() => {
      // @ts-expect-error only an array can be passed here
      cuddy({}, collection);
    }).toThrowErrorMatchingInlineSnapshot(
      `"The collection should be an array"`
    );
  });
});

describe('Wrong data type for stages', () => {
  test.each([
    ['null', null],
    ['number', 42],
    ['string', 'foo'],
    ['array', []],
    ['undefined', undefined]
  ])('Throws when the stages is %s', (_desc, stages) => {
    expect(() => {
      // @ts-expect-error only an object can be passed here
      cuddy(stages, []);
    }).toThrowErrorMatchingInlineSnapshot(`"The stages should be an object"`);
  });

  describe('Wrong stages', () => {
    test('Unknown stage', () => {
      const consoleSpy = jest.spyOn(console, 'warn');
      // @ts-expect-error foo is not a valid stage
      cuddy({ foo: 'bar' }, []);
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        "'stages' should be one of 'match, limit, skip, limit, orderBy, countBy, groupBy, fields, transform'. You passed 'foo'."
      );
      consoleSpy.mockRestore();
    });

    test('Warn when a stage contains invalid props', () => {
      const consoleSpy = jest.spyOn(console, 'warn');
      // @ts-expect-error foo, baz and boo are not a valid keys
      cuddy({ match: { eq: { foo: 'bar' }, gt: { baz: 1, boo: 2 } } }, [
        { title: 'One' }
      ]);
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenNthCalledWith(
        1,
        "'match.eq.foo' may not exist on the items in your collection."
      );
      expect(consoleSpy).toHaveBeenNthCalledWith(
        2,
        "'match.gt.baz' may not exist on the items in your collection."
      );
      expect(consoleSpy).toHaveBeenNthCalledWith(
        3,
        "'match.gt.boo' may not exist on the items in your collection."
      );
      consoleSpy.mockRestore();
    });

    test('Throw when a stage contains invalid values', () => {
      expect(() => {
        cuddy(
          {
            // @ts-expect-error count should be a number
            match: { gt: { count: 'foo' } },
            // @ts-expect-error reviews should be a number
            transform: { inc: { reviews: 'bar' } }
          },
          [{ count: 1, reviews: 2 }]
        );
      }).toThrowErrorMatchingInlineSnapshot(`
        "'match.gt.count' should be a 'Number'. You passed 'foo'.
        'transform.inc.reviews' should be a 'Number'. You passed 'bar'."
      `);
    });
  });
});
