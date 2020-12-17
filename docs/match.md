# Match stage

With matching, you can filter the list to only items that match the specified condition(s).

This stage follows this pattern: `{ match: { <operator>: { <field>: <value> } } }`. We'll always try to place the match stage as the first stage in the pipeline so that fewer items make it to the next stage.

In this stage, you have the following operators available:

* `eq` - Match any items where the value of a field matches the specified value.
* `neq` - Match any items where the value of a field **does not** match the specified value.
* `in` - Match any items where the value of a field includes the specified value. If the field is an array, at least one of the field's values needs to equal the specified value. If the field is a string, the operator will match items where the field's value includes the specified string.
* `nin` - Match any items where the value of a field **does not** include the specified value. If the field is an array, **none** of the field's values should equal the specified value. If the field is a string, the operator will match items where the field's value **does not** include the specified string.
* `gt` - Match any items where the value of a field **is greater than** the specified value.
* `lt` - Match any items where the value of a field **is less than** the specified value.
* `gte` - Match any items where the value of a field **is greater than or equal to** the specified value.
* `lte` - Match any items where the value of a field **is less than or equal to** the specified value.

Each operator comes with its own [examples](./operators.md).
