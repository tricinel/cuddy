# Pagination stage

In this stage, you can limit the items returned as well skip any number of items in your list, starting at the beginning of the list.

This stage follows this pattern: `{ limit: <number>, skip: <number> }`.

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
{ limit: 2, skip: 1 }
```

will match the first 2 items starting from the second in the list, returning:

```js
[
  { genre: 'Horror', title: 'xyz' },
  { genre: 'Horror', title: 'mnp' }
]
```
