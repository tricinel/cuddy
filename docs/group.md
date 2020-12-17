# Group Stage

In this stage, you can group your output by the specified field. This field must be present in each item in your list.

This stage follows this pattern: `{ groupBy: <field> }`.

**Example**

Consider the following data set:

```js
[
  { author: 'John', title: 'abc' },
  { author: 'Donna', title: 'xyz' },
  { author: 'Donna', title: 'mnp' },
  { author: 'Donna', title: 'def' },
  { author: 'John', title: 'uvw' },
  { author: 'Gemma', title: 'opr' }
]
```

```js
{ groupBy: 'author' }
```

will group all items by `title`, returning:

```js
[
  'John': [{ author: 'John', title: 'abc' }, { author: 'John', title: 'uvw' }],
  'Donna': [{ author: 'Donna', title: 'xyz' }, { author: 'Donna', title: 'mnp' }, { author: 'Donna', title: 'def' }],
  'Gemma': [{ author: 'Gemma', title: 'opr' }]
]
```
