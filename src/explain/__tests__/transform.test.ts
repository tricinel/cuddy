import explainTransform, { buildTransformOperation } from '../transform';
import type { TransformOperation } from '../transform';

const noop = (): void => {};

describe('Builds the transform operations', () => {
  test('single operator', () => {
    const query = { author: noop };

    expect(buildTransformOperation(query)).toEqual([
      {
        type: 'transform',
        field: 'author',
        query: `TRANSFORM 'author'`
      }
    ]);
  });

  test('multiple operators', () => {
    const query = { author: noop, title: noop, blurb: noop };

    expect(buildTransformOperation(query)).toEqual([
      {
        type: 'transform',
        field: 'author',
        query: `TRANSFORM 'author'`
      },
      {
        type: 'transform',
        field: 'title',
        query: `TRANSFORM 'title'`
      },
      {
        type: 'transform',
        field: 'blurb',
        query: `TRANSFORM 'blurb'`
      }
    ]);
  });
});

describe('Explains the transform stage', () => {
  test('single operation', () => {
    const operations: TransformOperation[] = [
      {
        type: 'transform',
        field: 'author',
        query: `TRANSFORM 'author'`
      }
    ];

    expect(explainTransform(operations)).toEqual(
      `FOR EACH of the results, TRANSFORM 'author'`
    );
  });

  test('multiple operations', () => {
    const operations: TransformOperation[] = [
      {
        type: 'transform',
        field: 'author',
        query: `TRANSFORM 'author'`
      },
      {
        type: 'transform',
        field: 'title',
        query: `TRANSFORM 'title'`
      },
      {
        type: 'transform',
        field: 'blurb',
        query: `TRANSFORM 'blurb'`
      }
    ];

    expect(explainTransform(operations)).toEqual(
      `FOR EACH of the results, TRANSFORM 'author' AND TRANSFORM 'title' AND TRANSFORM 'blurb'`
    );
  });
});
