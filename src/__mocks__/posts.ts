// Note: eslint-plugin import currently doesn't recognize import type declarations
// See https://github.com/benmosher/eslint-plugin-import/issues/1924
// eslint-disable-next-line import/no-unused-modules
export interface BlogPost {
  title: string;
  description: string;
  count: number;
  tags: string[];
  author?: string;
  genre?: string;
  published: boolean;
}

const posts: BlogPost[] = [
  {
    title: 'One',
    description: 'Description one',
    count: 2,
    tags: ['a', 'b', 'c', 'y'],
    genre: 'Comedy',
    published: true
  },
  {
    title: 'Two',
    description: 'Description two',
    count: 2,
    tags: ['a', 'x', 'y'],
    genre: 'Comedy',
    published: false
  },
  {
    title: 'Three',
    description: 'Description three',
    count: 5,
    tags: ['b', 'x', 'y'],
    genre: 'Horror',
    published: true
  }
];

export default posts;
