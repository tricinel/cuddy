// Note: eslint-plugin import currently doesn't recognize import type declarations
// See https://github.com/benmosher/eslint-plugin-import/issues/1924
// eslint-disable-next-line import/no-unused-modules
export interface Book {
  author: string;
  title: string;
  rating: number;
  ratings: number;
  reviews: number;
  blurb?: string;
  summary: string;
  genres: string[];
  similar?: string[];
  onSale: boolean;
  price: number;
}

const books: Book[] = [
  {
    title:
      'How to Measure Anything: Finding the Value of Intangibles in Business',
    author: 'Douglas W. Hubbard',
    rating: 3.97,
    ratings: 2230,
    reviews: 178,
    summary:
      'This new edition continues to boldly assert that any perception of immeasurability is based on certain popular misconceptions about measurement and measurement methods. It shows the common reasoning for calling something immeasurable, and sets out to correct those ideas.',
    genres: [
      'Business',
      'Nonfiction',
      'Science',
      'Economics',
      'Leadership',
      'Reference'
    ],
    onSale: false,
    price: 40.99
  },
  {
    title: 'Imposter 13',
    author: 'Rob Sinclair',
    rating: 4.36,
    ratings: 232,
    reviews: 15,
    summary:
      'Against all odds, Aydin Torkal - aka Sleeper 13 - broke free from the terrorist group that took him as a child and raised him into a life of violence and hate.',
    genres: ['Thriller'],
    onSale: false,
    price: 9.99
  },
  {
    title: 'Fugitive 13',
    author: 'Rob Sinclair',
    rating: 4.15,
    ratings: 700,
    reviews: 40,
    summary: `Hunted not only by the world's intelligence agencies, but also by the elite brotherhood of insurgents he betrayed, he has lived the past year like a ghost. Until now`,
    genres: ['Thriller', 'Fiction', 'Politics'],
    onSale: true,
    price: 4.99
  },
  {
    title: 'Recursion',
    author: 'Blake Crouch',
    rating: 4.15,
    ratings: 110029,
    reviews: 15024,
    summary: `That’s what New York City cop Barry Sutton is learning as he investigates the devastating phenomenon the media has dubbed False Memory Syndrome—a mysterious affliction that drives its victims mad with memories of a life they never lived.`,
    genres: [
      'Thriller',
      'Fiction',
      'Science Fiction',
      'Mystery',
      'Adult',
      'Fantasy'
    ],
    onSale: true,
    price: 6.99
  },
  {
    title: 'Dark Matter',
    author: 'Blake Crouch',
    rating: 4.09,
    ratings: 260690,
    reviews: 32099,
    summary: `Jason Dessen is walking home through the chilly Chicago streets one night, looking forward to a quiet evening in front of the fireplace with his wife, Daniela, and their son, Charlie—when his reality shatters.`,
    genres: [
      'Thriller',
      'Fiction',
      'Science Fiction',
      'Mystery',
      'Adult',
      'Fantasy',
      'Suspense'
    ],
    onSale: false,
    price: 11.99
  }
];

export default books;
