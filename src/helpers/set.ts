export default function set<Item>(value: unknown): (record: Item) => unknown {
  return function transform(_record: Item): unknown {
    return value;
  };
}
