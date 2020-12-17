# Match operators

The following are examples of the operators you can use in the [match stage](./match.md).

**Examples**

Consider the following data set:

```js
[
  {
    title: 'abc',
    tags: ['x', 'y'],
    count: 2
  },
  {
    title: 'xyz',
    tags: ['x', 'a'],
    count: 3
  }
]
```

**eq**

```js
{ match: { eq: { title: 'abc' } }
```

will match all the items where `title` equals `abc`, returning:

```js
[{ title: 'abc', tags: ['x', 'y'], count: 2 }]
```

**neq**

```js
{ match: { neq: { title: 'abc' } }
```

will match all the items where `title` **does not** equal `abc`, returning:

```js
[{ title: 'xyz', tags: ['x', 'a'], count: 3 }]
```

**in (array)**

```js
{ match: { in: { tags: 'y' } }
```

will match all the items where `tags` includes `y`, returning:

```js
[{ title: 'abc', tags: ['x', 'y'], count: 2 }]
```

```js
{ match: { in: { tags: 'x' } }
```

will match all the items where `tags` includes `x`, returning:

```js
[{ title: 'abc', tags: ['x', 'y'], count: 2 }, { title: 'xyz', tags: ['x', 'a'], count: 3 }]
```

**in (string)**

```js
{ match: { in: { title: 'ab' } }
```
will match all the items where `title` includes `ab`, returning:

```js
[{ title: 'abc', tags: ['x', 'y'], count: 2 }]
```

**nin (array)**

```js
{ match: { nin: { tags: 'y' } }
```

will match all the items where `tags` **does not** include `y`, returning:

```js
[{ title: 'xyz', tags: ['x', 'a'], count: 3 }]
```

**nin (string)**

```js
{ match: { nin: { title: 'ab' } }
```
will match all the items where `title` **does not** include `ab`, returning:

```js
[{ title: 'xyz', tags: ['x', 'a'], count: 3 }]
```

**gt**

```js
{ match: { gt: { count: 1 } }
```

will match all the items where `count` is greater than `1`, returning:

```js
[{ title: 'abc', tags: ['x', 'y'], count: 2 }]
```

**lt**

```js
{ match: { lt: { count: 3 } }
```

will match all the items where `count` is less than `3`, returning:

```js
[{ title: 'abc', tags: ['x', 'y'], count: 2 }]
```

**gte**

```js
{ match: { gte: { count: 3 } }
```

will match all the items where `count` is greater than or equal to `3`, returning:

```js
[{ title: 'xyz', tags: ['x', 'a'], count: 3 }]
```

**lte**

```js
{ match: { lte: { count: 2 } }
```

will match all the items where `count` is less than or equal to `2`, returning:

```js
[{ title: 'abc', tags: ['x', 'y'], count: 2 }]
```

You can combine multiple fields per operator.

```js
{ match: { in: { title: 'ab', tags: 'y' } }
```

will match all the items where `title` includes `ab` **AND** `tags` contains `y`, returning:

```js
[{ title: 'abc', tags: ['x', 'y'], count: 2 }]
```

And you can combine multiple operators as well.

```js
{ match: { eq: { title: 'abc' }, in: { tags: 'a' } }
```

will match all the items where `title` equals `abc` **AND** `tags` contains `a`, returning:

```js
[]
```
