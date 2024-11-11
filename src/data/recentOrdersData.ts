

export type ISBN10 = [number, number, number, number, number, number, number, number, number, number];

// Define ISBN13 as an object with a 3-integer prefix and an ISBN10
export interface ISBN13 {
  prefix: [number, number, number];
  isbn10: ISBN10;
}

interface RowsProps {
  id: number | string;
  title: string;
  author : string[];
  genre: string;
  release: Date;
  ISBN: ISBN10 | ISBN13;
}

export const rows: RowsProps[] = [
  {
    id: '#1001',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: [1,2,3,4,5,6,7,8,9,10]
  },
  {
    id: '#1002',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: {prefix : [1,2,3], isbn10 : [1,2,3,4,5,6,7,8,9,10]}
  },
  {
    id: '#1003',
    title: "Faust geht in eine hoehle und kauft sich ein brot das lecker schmecker macht und toll ist",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: [1,2,3,4,5,6,7,8,9,10]
  },
  {
    id: '#1004',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: {prefix : [1,2,3], isbn10 : [1,2,3,4,5,6,7,8,9,10]}
  },
  {
    id: '#1005',
    title: "Faust",
    author: ["Goethe", "Schiller", "Hubert", "Staller", "El professore"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: [1,2,3,4,5,6,7,8,9,10]
  },
  {
    id: '#1006',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: {prefix : [1,2,3], isbn10 : [1,2,3,4,5,6,7,8,9,10]}
  },
  {
    id: '#1007',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: [1,2,3,4,5,6,7,8,9,10]
  },
  {
    id: '#1008',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: {prefix : [1,2,3], isbn10 : [1,2,3,4,5,6,7,8,9,10]}
  },
  {
    id: '#1009',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: [1,2,3,4,5,6,7,8,9,10]
  },
  {
    id: '#1010',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: {prefix : [1,2,3], isbn10 : [1,2,3,4,5,6,7,8,9,10]}
  },
  {
    id: '#1011',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: [1,2,3,4,5,6,7,8,9,10]
  },
  {
    id: '#1012',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: {prefix : [1,2,3], isbn10 : [1,2,3,4,5,6,7,8,9,10]}
  },
  {
    id: '#1013',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: [1,2,3,4,5,6,7,8,9,10]
  },
  {
    id: '#1014',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: {prefix : [1,2,3], isbn10 : [1,2,3,4,5,6,7,8,9,10]}
  },
  {
    id: '#1015',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: [1,2,3,4,5,6,7,8,9,10]
  },
  {
    id: '#1016',
    title: "Faust",
    author: ["Goethe"],
    genre: "Drama",
    release: new Date('December 17, 1808'),
    ISBN: {prefix : [1,2,3], isbn10 : [1,2,3,4,5,6,7,8,9,10]}
  }
];
