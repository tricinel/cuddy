# cuddy

**cuddy** is an aggregation pipeline built in a functional programming style. If you ever wanted to search through a collection using logical operators, sort, group, transform and return only the fields you care about, then cuddy is for you.

![Npm version][npm-version-badge] ![Build status][build-status-badge] ![Node Version][node-version-badge] ![License][license-badge]

## Install

This module is distributed via npm which is bundled with node and should be installed as one of your project's dependencies:

`npm install cuddy --save` or `yarn add cuddy`

### Usage

Import cuddy and create the query.

```js
import cuddy from 'cuddy';

const query = {
  fields: ['title', 'url', 'runTime'],
  match: {
    in: { genre: 'Comedy', cast: 'Adam Sandler' },
    eq: { lang: 'en' }
  },
  orderBy: {
    reviews: 'asc'
  },
  groupBy: 'director',
  transform: {
    alias: { url: 'permalink' }
  },
  limit: 2,
  skip: 1
};
```

The above query translates into:

- I want all the items where the `genre` contains `Comedy` and `cast` contains `Adam Sandler` and the `lang` is `en`.
- I want only 2 results and I want to skip the first item in the list.
- I want to order the items by `reviews` in ascending order.
- I want to group the items by `director`.
- From all the fields of each item, I only want the `title`, `url` and `runTime`.
- I want to rename the field `url` to `permalink`.

Next, build the pipeline and aggregate your data.

```js
const { aggregate } = cuddy(query, data);
const results = aggregate();
```

Depending on the shape of your data, the results could look like this:

```json
{
  "Robert Smigel": [
    {
      "title": "The Week Of",
      "permalink": "https://www.imdb.com/title/tt6821012",
      "runTime": 116
    }
  ]
}
```

> For more query examples, see the [Books test cases](./src/__tests__/books.test.ts) and the associated [Books collection](./src/__mocks__/books.ts).
>
> If it looks like mongodb's query language, it's because lots of inspirations came from there. :)

### Stages

The aggregation pipeline contains the following stages:

- [Matching](./docs/match.md). Filter out any items that do not match the criteria.
- [Sorting](./docs/sort.md). Sort the items in  the specified order.
- [Pagination](./docs/pagination.md). Limit the number of results and/or skip over the first results.
- [Grouping](./docs/group.md). Group the items by a specified field.
- [Count](./docs/count.md). Count the items by a specified field.
- [Project](./docs/project.md). Limit the fields that are returned for each item.
- [Transform](./docs/transform.md). Transform any of the properties of the matched items.

### Pipeline functions

Once you've built your pipeline, you can use it to aggregate your data and return results. Depending on whether you want one result, all of them or just a count of the total results, you will need to call the appropriate method:

* `aggregate()` will return all the results from your query.
* `first()` will return the first result in the list of results from your query.
* `last()` will return the last result in the list of results from your query.
* `count()` will return the total number of results from your query.
* `explain()` will return an object explaining the set of steps resulted from your query. For details on the output, see the [Explanation](./docs/explain.md) section.

#### Why cuddy?

> _noun_
>
> cud·​dy | \ ˈku̇-dē
>
> Synonyms: donkey (British slang)

The donkey is used as a working animal and is considered the cheapest form of labor.

#### Contributing

- Run tests with `npm run test` or `yarn test`.
- Run the lint with `npm run lint` or `yarn lint`.

For details, check out the [Contributing][contributing] guide.

##### LICENSE

MIT

[contributing]: ./Contributing.md
[license-badge]: https://img.shields.io/npm/l/cuddy.svg?style=flat-square
[node-version-badge]: https://img.shields.io/node/v/cuddy?style=flat-square
[npm-version-badge]: https://img.shields.io/npm/v/cuddy?style=flat-square
[build-status-badge]: https://img.shields.io/circleci/build/github/tricinel/cuddy?label=circleci&style=flat-square
