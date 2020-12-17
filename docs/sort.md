# Sort Stage

The orderBy stage sorts the items of the pipeline in ascending or descending order, for each field used. We'll always try to place the sort stage as close as possible to the start of the pipeline so that items are already in order in the next stages.

This stage follows this pattern: `{ orderBy: { <field>: <order> } }`. This field must be present in each item in your list.

**Example**

Consider the following data set:

```js
[
  { title: 'abc', count: 1 },
  { title: 'def', count: 2 },
  { title: 'xyz', count: 4 },
  { title: 'mnp', count: 7 },
  { title: 'tri', count: 3 },
  { title: 'uvw', count: 5 }
]
```

```js
{ sortBy: { count: 'asc' } }
```

will sort all items by `count` in ascending order, returning:

```js
[
  { title: 'abc', count: 1 },
  { title: 'def', count: 2 },
  { title: 'tri', count: 3 },
  { title: 'xyz', count: 4 },
  { title: 'uvw', count: 5 }
  { title: 'mnp', count: 7 },
]
```
