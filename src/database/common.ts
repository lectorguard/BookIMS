export type ISBN10 = [number, number, number, number, number, number, number, number, number, number];

// Define ISBN13 as an object with a 3-integer prefix and an ISBN10
export interface ISBN13 {
  prefix: [number, number, number];
  isbn10: ISBN10;
}

export interface Book {
  id: string;
  title: string;
  authors: string[];
  genres: string[];
  publication_date: Date;
  isbn: ISBN10 | ISBN13;
}

export interface Book_DB {
    book_id: string;
    title: string;
    authors: string; // Concatenated author names
    genres: string;  // Concatenated genre names
    publication_date: string;
    isbn: string;
}