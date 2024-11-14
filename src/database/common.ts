// We distinguish between ISBN10 and ISBN13
export type ISBN10 = [number, number, number, number, number, number, number, number, number, number];

// Define ISBN13 as an object with a 3-integer prefix and an ISBN10
export interface ISBN13 {
  prefix: [number, number, number];
  isbn10: ISBN10;
}

// Book uses stronger requirements, used for validation and to display data in table
export interface Book {
  id: string;
  title: string;
  authors: string[];
  genres: string[];
  publication_date: Date;
  isbn: ISBN10 | ISBN13;
}

// Book_DB has weaker requirements, but is closer to database representations
export interface Book_DB {
    book_id: string;
    title: string;
    authors: string; 
    genres: string; 
    publication_date: string;
    isbn: string;
}