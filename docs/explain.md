# Explaning the query

Sometimes you want to check if what you've declared as the query is what is actually being executed in the pipeline. This is where the `explain()` method comes in handy. It will look at the stages declared in your query and summarize the exact steps that will be performed in the exact order they would happen should you decide to run the query as is.

This is not so much a query planner in the database sense of the word, but rather an easier way to understand your query.

> Explain does not run the pipeline or performs any sort of modifications on your collection. It only provides an overview of the query that _would_ be performed when one of the aggregation methods is actually run on the collection.

Consider the following query:

```js
const query = {
  match: {
    in: { genres: 'Fiction' },
    gt: { price: 9 }
  },
  orderBy: { ratings: 'asc' },
  fields: ['author', 'title', 'ratings']
}

const pipeline = cuddy(query);
```

Running `pipeline([]).explain()` will return the following:

```json
{
  "queryHash": "1xywtan",
  "collectionSize": 0,
  "query": [
    {
      "comparator": "Fiction",
      "field": "genres",
      "operator": "in",
      "query": "'genres' contains 'Fiction'",
      "type": "match",
    },
    {
      "comparator": 9,
      "field": "price",
      "operator": "gt",
      "query": "'price' is greater than '9'",
      "type": "match",
    },
    {
      "field": "ratings",
      "order": "asc",
      "query": "'ratings' from lowest to highest",
      "type": "orderBy",
    },
    {
      "projection": [
        "author",
        "title",
        "ratings",
      ],
      "query": "'author', 'title' and 'ratings'",
      "type": "fields",
    }
  ],
  "summary": "MATCH items in the collection WHERE 'genres' contains 'Fiction' AND 'price' is greater than '9'. ORDER the results BY 'ratings' from lowest to highest. ONLY RETURN the 'author', 'title' and 'ratings' fields for each result",
  "totalOperations": 4
}
```
