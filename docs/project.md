# Project Stage

In this stage, you can make sure that only the specific fields are returned for each item in your list.

This stage follows this pattern: `{ fields: [<field>] }`.

Consider the following data set:

```js
[
  {
    title: 'abc',
    tags: ['x', 'y'],
    author: 'John'
  },
  {
    title: 'xyz',
    tags: ['x', 'a'],
    author: 'Donna'
  },
  {
    title: 'def',
    tags: ['a', 'b'],
    author: 'Gemma'
  }
]
```

```js
{ fields: ['title', 'author'] }
```

will return the items with only the `title` and `author` fields present. The projection stage is always the last stage to run in the pipeline.

> You can use any fields in all the other stages without an impact in your projection.

```js
[{ title: 'abc', author: 'John' }, { title: 'xyz', author: 'Donna' }, { title: 'def', author: 'Gemma' }]
```

> Known issue: If you combine the `alias` in the [transform](./transform.md) stage with this stage, you need to add the **new** field name to the list of returned fields and not the old one. Because this is Typescript, your editor might complain that the new field doesn't exist on your items.
