# Transform stage

In this stage, you can transform the properties of each item that reached this stage.

This stage follows this pattern: `{ transform: { <operator>: { <field>: <value> } } }`.

In this stage, you have the following operators available:

* `alias` - Rename a field if it exists on the item.
* `inc` - Increment the value of a field by a value. This operator expects the field's value to be of type `number`.
* `dec` - Decrement the value of a field by a value. This operator expects the field's value to be of type `number`.
* `set` - Update the value of a field to be a specific value.

**Examples**

Consider the following data set:

```js
[
  { title: 'abc', count: 1 },
  { title: 'xyz', count: 2 },
  { title: 'mnp', count: 3 },
  { title: 'def', count: 4 },
  { title: 'uvw', count: 5 }
]
```

**alias**

```js
{ transform: { alias: { title: 'name' } }
```

will rename the `title` property of each item to be `name`, returning:

```js
[
  { name: 'abc', count: 1 },
  { name: 'xyz', count: 2 },
  { name: 'mnp', count: 3 },
  { name: 'def', count: 4 },
  { name: 'uvw', count: 5 }
]
```

> Known issue: If you combine the `alias` in the `transform` stage with the [projection](./project.md) stage, you need to add the **new** field name to the list of returned fields and not the old one. Because this is Typescript, your editor might complain that the new field doesn't exist on your items.

**inc**

```js
{ transform: { inc: { count: 2 } }
```

will increment each of the `count` properties of each item by `2`, returning:

```js
[
  { title: 'abc', count: 3 },
  { title: 'xyz', count: 4 },
  { title: 'mnp', count: 5 },
  { title: 'def', count: 6 },
  { title: 'uvw', count: 7 }
]
```

**dec**

```js
{ transform: { dec: { count: 1 } }
```

will decrement each of the `count` properties of each item by `1`, returning:

```js
[
  { title: 'abc', count: 0 },
  { title: 'xyz', count: 1 },
  { title: 'mnp', count: 2 },
  { title: 'def', count: 3 },
  { title: 'uvw', count: 4 }
]
```

**set**

```js
{ transform: { set: { count: 10 } }
```

will set each of the `count` properties of each item to `10`, returning:

```js
[
  { title: 'abc', count: 10 },
  { title: 'xyz', count: 10 },
  { title: 'mnp', count: 10 },
  { title: 'def', count: 10 },
  { title: 'uvw', count: 10 }
]
```
