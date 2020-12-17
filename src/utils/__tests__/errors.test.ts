import { invalidProp, invalidValue } from '../errors';

describe('Wrong prop types', () => {
  test('Create error message when using the wrong prop value in a list', () => {
    expect(
      invalidValue({
        propPath: 'orderBy.title',
        expected: ['asc', 'desc'],
        actual: 'foo'
      })
    ).toEqual({
      level: 'error',
      message: `'orderBy.title' should be one of 'asc, desc'. You passed 'foo'.`
    });

    expect(
      invalidValue({
        propPath: 'countBy',
        expected: ['title', 'author'],
        actual: 'foo'
      })
    ).toEqual({
      level: 'error',
      message: `'countBy' should be one of 'title, author'. You passed 'foo'.`
    });

    expect(
      invalidValue({
        propPath: 'match.gt.title',
        expected: 'Number',
        actual: 'foo'
      })
    ).toEqual({
      level: 'error',
      message: `'match.gt.title' should be a 'Number'. You passed 'foo'.`
    });
  });

  test('Create warn message when using a prop that may not exist on the items in the collection', () => {
    expect(
      invalidProp({
        level: 'warn',
        propPath: 'orderBy.foo'
      })
    ).toEqual({
      level: 'warn',
      message: `'orderBy.foo' may not exist on the items in your collection.`
    });
  });
});
