import { assertIsNumber, assertIsDefined, isObject, isArray } from '../guards';

describe('Type assertions', () => {
  test('asserts a value is a number', () => {
    expect(() => {
      assertIsNumber(2);
    }).not.toThrow();

    expect(() => {
      assertIsNumber('2');
    }).toThrowErrorMatchingInlineSnapshot(
      `"The value should to be a number! You passed string!"`
    );

    expect(() => {
      assertIsNumber('2', 'This is my error message');
    }).toThrowErrorMatchingInlineSnapshot(`"This is my error message"`);
  });

  test('asserts a value is defined', () => {
    expect(() => {
      assertIsDefined(2);
    }).not.toThrow();

    expect(() => {
      assertIsDefined('2');
    }).not.toThrow();

    expect(() => {
      assertIsDefined([2]);
    }).not.toThrow();

    expect(() => {
      assertIsDefined({ x: 2 });
    }).not.toThrow();

    expect(() => {
      assertIsDefined(true);
    }).not.toThrow();

    expect(() => {
      assertIsDefined(undefined);
    }).toThrowErrorMatchingInlineSnapshot(`"The value is undefined!"`);

    expect(() => {
      assertIsDefined(undefined, 'This is my error message');
    }).toThrowErrorMatchingInlineSnapshot(`"This is my error message"`);
  });
});

describe('Type guards', () => {
  test('value is an object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject(2)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  test('value is an array', () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray(2)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });
});
