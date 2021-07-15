# Transform stage

In this stage, you can modify existing properties or add new properties to each item that reached this stage.

This stage follows this pattern: `{ transform: { <field>: <transformationFunction> } }`. If the `<field>` exists, its value will be overwritten. If it's a new field, it will be added.

In the transformation function, you have access to the item and all its properties. A very basic transformation function is one that creates a new field and sets its value to the value of one of the old fields.

```ts
function setValueForName(newValue: string) {
  return function transform(record: Record<string, unknown>): string {
    return newValue;
  }
}
```

The transformation function receives the record as its argument and must return a new value. As such, it has the following signature:

```ts
type TransformationFunction = (record: Record<string, unknown>) => unknown;
```

**Examples**

Consider the following data set:

```js
[
  { author: 'John Doe', title: 'abc', count: 1 },
  { author: 'Jane Doe', title: 'xyz', count: 2 },
  { author: 'John Doe', title: 'mnp', count: 3 },
  { author: 'Jane Doe', title: 'def', count: 4 },
  { author: 'Jane Doe', title: 'uvw', count: 5 }
]
```

**Create a new field and set its value**

```js
function set(value) {
  return value;
}

{ transform: { active: set(true), status: set('published') } }
```

will create two new properties for each item, `active` and `status`, returning:

```js
[
  { author: 'John Doe', title: 'abc', count: 1, active: true, status: 'published' },
  { author: 'Jane Doe', title: 'xyz', count: 2, active: true, status: 'published' },
  { author: 'John Doe', title: 'mnp', count: 3, active: true, status: 'published' },
  { author: 'Jane Doe', title: 'def', count: 4, active: true, status: 'published' },
  { author: 'Jane Doe', title: 'uvw', count: 5, active: true, status: 'published' }
]
```

**Create a new field and set its value to one of the old fields**

```js
function copyFrom(field) {
  // prop comes from ramda
  return prop(field);
}

{ transform: { name: copyFrom('title') } }
```

will create a new property for each item, `name`, returning:

```js
[
  { author: 'John Doe', title: 'abc', count: 1, name: 'abc' },
  { author: 'Jane Doe', title: 'xyz', count: 2, name: 'xyz' },
  { author: 'John Doe', title: 'mnp', count: 3, name: 'mnp' },
  { author: 'Jane Doe', title: 'def', count: 4, name: 'def' },
  { author: 'Jane Doe', title: 'uvw', count: 5, name: 'uvw' }
]
```

You can of course do multiple transformations, like:

```js
function copyFromAndUppercase(field) {
  // compose, prop and toUpper come from ramda
  return compose(toUpper, prop(field));
}

{ transform: { name: copyFromAndUppercase('title') } }
```

returns:

```js
[
  { author: 'John Doe', title: 'abc', count: 1, name: 'ABC' },
  { author: 'Jane Doe', title: 'xyz', count: 2, name: 'XYZ' },
  { author: 'John Doe', title: 'mnp', count: 3, name: 'MNP' },
  { author: 'Jane Doe', title: 'def', count: 4, name: 'DEF' },
  { author: 'Jane Doe', title: 'uvw', count: 5, name: 'UVW' }
]
```

**Increment the value of an existing property**

```js
function incrementBy(value, field) {
  // compose, add and prop come from ramda
  return compose(add(value), prop(field));
}

{ transform: { count: incrementBy(2, 'count') } }
```

returns:

```js
[
  { author: 'John Doe', title: 'abc', count: 3 },
  { author: 'Jane Doe', title: 'xyz', count: 4 },
  { author: 'John Doe', title: 'mnp', count: 5 },
  { author: 'Jane Doe', title: 'def', count: 6 },
  { author: 'Jane Doe', title: 'uvw', count: 7 }
]
```

**Create new fields with computed values from existing fields**

```js
function valueAt(idx, field) {
  return function transform(record) {
    // split and prop come from ramda
    const values = split(' ', prop(field, record));
    return values[idx];
  };
}

{ transform: { firstName: valueAt(0, 'author'), lastName: valueAt(1, 'author') } }
```

returns:

```js
[
  { author: 'John Doe', title: 'abc', count: 1, firstName: 'John', lastName: 'Doe' },
  { author: 'Jane Doe', title: 'xyz', count: 2, firstName: 'Jane', lastName: 'Doe' },
  { author: 'John Doe', title: 'mnp', count: 3, firstName: 'John', lastName: 'Doe' },
  { author: 'Jane Doe', title: 'def', count: 4, firstName: 'Jane', lastName: 'Doe' },
  { author: 'Jane Doe', title: 'uvw', count: 5, firstName: 'Jane', lastName: 'Doe' }
]
```

**Create new fields with derived values from the computed values of newly created fields**

```js
function getInitials(field1, field2) {
  return function transform(record) {
    // prop comes from ramda
    return `${prop(field1, record).charAt(0)}${prop(field2, record).charAt(0)}`;
  }
}

{ transform: { firstName: valueAt(0, 'author'), lastName: valueAt(1, 'author'), initials: getInitials('firstname', 'lastName') } }
```

In the above example, the original record had neither the `firstName` or the `lastName` fields. These were both created before the new `initials` field was created, since that field uses the result of the two.

> When using computed fields like this, the order matters. Any field where you need to use the values of previous fields must come **after** those fields.

## Helper functions

Cuddy exposes a few helper functions for you to aid you in your transforms.

Consider the same dataset as before:

```js
const books = [
  { author: 'John Doe', title: 'abc', count: 1 },
  { author: 'Jane Doe', title: 'xyz', count: 2 }
];
```

**copyFrom**

Set the value of a field based on the value of a different field.

```js
import cuddy from 'cuddy';
import { copyFrom } from 'cuddy/helpers';

const query = { transform: { name: copyFrom('title') } };
cuddy(books).aggregate();
```

returns:

```js
[
  { author: 'John Doe', title: 'abc', count: 1, name: 'abc' },
  { author: 'Jane Doe', title: 'xyz', count: 2, name: 'xyz' }
]
```

**inc**

Increment the value of a field.

```js
import cuddy from 'cuddy';
import { inc } from 'cuddy/helpers';

const query = { transform: { count: inc(10, 'count') } };
cuddy(books).aggregate();
```

returns:

```js
[
  { author: 'John Doe', title: 'abc', count: 11 },
  { author: 'Jane Doe', title: 'xyz', count: 12 }
]
```

**dec**

Decrement the value of a field.

```js
import cuddy from 'cuddy';
import { dec } from 'cuddy/helpers';

const query = { transform: { count: dec(1, 'count') } };
cuddy(books).aggregate();
```

returns:

```js
[
  { author: 'John Doe', title: 'abc', count: 0 },
  { author: 'Jane Doe', title: 'xyz', count: 1 }
]
```

**set**

Set the value of a field.

```js
import cuddy from 'cuddy';
import { set } from 'cuddy/helpers';

const query = { transform: { count: set(0) } };
cuddy(books).aggregate();
```

returns:

```js
[
  { author: 'John Doe', title: 'abc', count: 0 },
  { author: 'Jane Doe', title: 'xyz', count: 0 }
]
```
