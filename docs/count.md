# Count stage

In this stage, you can count the items that have a certain field.

>>> If you have the count stage present in your pipeline, the [projection stage](./project.md) is ignored.

This stage follows this pattern: `{ countBy: <field> }`.

Consider the following data set:

```js
[
  { genre: 'Drama', title: 'abc' },
  { genre: 'Horror', title: 'xyz' },
  { genre: 'Horror', title: 'mnp' },
  { genre: 'Horror', title: 'def' },
  { genre: 'Comedy', title: 'uvw' }
]
```

```js
{ countBy: 'genre' }
```

will count all items by `genre`, returning:

```js
{
  'Drama': 1,
  'Horror': 3,
  'Comedy': 1
}
```
