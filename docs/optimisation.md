# Optimisation

The pipeline has an optimization phase which attempts to order its stages for improved performance. To see what optimisation strategy is used for a particular pipeline, you can build the pipeline and then use the `explain()` operation on it. There's no need to pass it any actual data.

There are two types of optimisations that the pipeline attempts:

**Projection Optimisation**

The pipeline can determine if it requires only a subset of the fields in the items to obtain the results. If so, the pipeline will only use those required fields, reducing the amount of data passing through the pipeline. This optimisation is only attempted if you use the [projection stage](./project.md) in your pipeline, by passing the `fields` option.

>>> You can skip the projection optimisation by passing `{ optimisationStrategy: 'NONE' }` as the second argument when building your pipeline. This tells the pipeline that it shouldn't attempt to pick only the fields that are used in the pipeline stages and instead just rely on all the fields being used at one stage or another.

**Pipeline Sequence Optimisation**

The pipeline will attempt to match the following sequence as closely as possible:

1. project (optimisation)
2. match
3. sort
4. skip
5. limit
6. group
7. count
8. project
