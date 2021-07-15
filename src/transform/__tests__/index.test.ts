import { always, prop, split } from 'ramda';
import transformer from '..';

const post = {
  title: 'One',
  count: 2,
  genre: 'Comedy',
  author: 'John Doe'
};

function valueAt(
  idx: number,
  field: string
): (r: Record<string, unknown>) => unknown {
  return function transform(record): unknown {
    const values = split(' ', prop(field, record) as string);
    return values[idx];
  };
}

function getInitials(
  field1: string,
  field2: string
): (r: Record<string, unknown>) => string {
  return function transform(record: Record<string, unknown>): string {
    const first: string = prop(field1, record) as string;
    const second: string = prop(field2, record) as string;
    return `${first.charAt(0)}${second.charAt(0)}`;
  };
}

function incrementBy(
  value: number,
  field: string
): (r: Record<string, unknown>) => number {
  return function transform(record: Record<string, unknown>): number {
    const currentValue: number = record[field] as number;
    return currentValue + value;
  };
}

test('Create a new field and set its value', () => {
  const result = transformer({ active: always(true) })(post);
  const resultAfter = { ...post, active: true };

  expect(result).toEqual(resultAfter);
});

test('Create a new field and set its value to one of the old fields', () => {
  const result = transformer({ postTitle: prop('title') })(post);
  const resultAfter = { ...post, postTitle: post.title };

  expect(result).toEqual(resultAfter);
});

test('Increment the value of an existing property', () => {
  const result = transformer({ count: incrementBy(2, 'count') })(post);
  const resultAfter = { ...post, count: post.count + 2 };

  expect(result).toEqual(resultAfter);
});

test('Create new fields with computed values from existing fields', () => {
  const result = transformer({
    firstName: valueAt(0, 'author'),
    lastName: valueAt(1, 'author')
  })(post);
  const resultAfter = { ...post, firstName: 'John', lastName: 'Doe' };

  expect(result).toEqual(resultAfter);
});

test('Create new fields with derived values from the computed values of newly created fields', () => {
  const result = transformer({
    firstName: valueAt(0, 'author'),
    lastName: valueAt(1, 'author'),
    initials: getInitials('firstName', 'lastName')
  })(post);
  const resultAfter = {
    ...post,
    firstName: 'John',
    lastName: 'Doe',
    initials: 'JD'
  };

  expect(result).toEqual(resultAfter);
});
