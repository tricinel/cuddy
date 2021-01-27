interface Dictionary {
  item: string[];
  result: string[];
  field: string[];
}

const dictionary: Dictionary = {
  item: ['no items', 'item', 'items'],
  result: ['no results', 'result', 'results'],
  field: ['no fields', 'field', 'fields']
};

export default function pluralize(
  count: number,
  word: keyof Dictionary
): string {
  if (typeof dictionary[word] !== 'undefined') {
    if (count === 0) {
      return dictionary[word][0];
    }

    if (count === 1) {
      return dictionary[word][1];
    }

    return dictionary[word][2];
  }

  return word;
}
