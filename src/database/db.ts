import Database from 'better-sqlite3';
import { Book_DB } from './common';

const db = new Database('books.db');

db.exec('PRAGMA foreign_keys = ON;');

// Base information using custom uuid from the app
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    book_id TEXT PRIMARY KEY,  -- use UUID passed from the app
    title TEXT NOT NULL,
    publication_date TEXT,
    isbn TEXT NOT NULL
  );
`);

// Create tables for authors, genres, book_authors, and book_genres to improve performance
db.exec(`
  CREATE TABLE IF NOT EXISTS authors (
    author_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS genres (
    genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS book_authors (
    book_id TEXT NOT NULL,  
    author_id INTEGER NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS book_genres (
    book_id TEXT NOT NULL,  
    genre_id INTEGER NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, genre_id)
  );
`);

// Sample data
const sampleBooks: Book_DB[] = 
[
  {
    book_id: "215656584948",
    title: "Good Omens",
    authors: "Neil Gaiman, Terry Pratchett",
    genres: "Fantasy, Comedy",
    publication_date: "03/02/1808",
    isbn: "9780060853983"
  },
  {
    book_id: "215656584949",
    title: "The Hobbit",
    authors: "J.R.R. Tolkien",
    genres: "Fantasy, Adventure",
    publication_date: "21/09/1937",
    isbn: "9780345339683"
  },
  {
    book_id: "215656584950",
    title: "1984",
    authors: "George Orwell",
    genres: "Dystopian, Political Fiction",
    publication_date: "08/06/1949",
    isbn: "9780451524935"
  },
  {
    book_id: "215656584951",
    title: "Pride and Prejudice",
    authors: "Jane Austen",
    genres: "Romance, Classic",
    publication_date: "28/01/1813",
    isbn: "9781503290563"
  },
  {
    book_id: "215656584952",
    title: "To Kill a Mockingbird",
    authors: "Harper Lee",
    genres: "Fiction, Historical",
    publication_date: "11/07/1960",
    isbn: "9780061120084"
  },
  {
    book_id: "215656584953",
    title: "The Great Gatsby",
    authors: "F. Scott Fitzgerald",
    genres: "Fiction, Classic",
    publication_date: "10/04/1925",
    isbn: "9780743273565"
  },
  {
    book_id: "215656584954",
    title: "Moby-Dick",
    authors: "Herman Melville",
    genres: "Adventure, Classic",
    publication_date: "18/10/1851",
    isbn: "9781503280786"
  },
  {
    book_id: "215656584955",
    title: "Brave New World",
    authors: "Aldous Huxley",
    genres: "Dystopian, Science Fiction",
    publication_date: "01/01/1932",
    isbn: "9780060850524"
  },
  {
    book_id: "215656584956",
    title: "The Catcher in the Rye",
    authors: "J.D. Salinger",
    genres: "Fiction, Coming-of-age",
    publication_date: "16/07/1951",
    isbn: "9780316769488"
  },
  {
    book_id: "215656584957",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    authors: "J.R.R. Tolkien",
    genres: "Fantasy, Adventure",
    publication_date: "29/07/1954",
    isbn: "9780261103573"
  },
  {
    book_id: "215656584958",
    title: "The Chronicles of Narnia: The Lion, the Witch, and the Wardrobe",
    authors: "C.S. Lewis",
    genres: "Fantasy, Adventure",
    publication_date: "16/10/1950",
    isbn: "9780064471046"
  },
  {
    book_id: "215656584959",
    title: "Harry Potter and the Sorcerer's Stone",
    authors: "J.K. Rowling",
    genres: "Fantasy, Magic",
    publication_date: "26/06/1997",
    isbn: "9780439708180"
  },
  {
    book_id: "215656584960",
    title: "A Game of Thrones",
    authors: "George R.R. Martin",
    genres: "Fantasy, Adventure",
    publication_date: "06/08/1996",
    isbn: "9780553103540"
  },
  {
    book_id: "215656584961",
    title: "The Fault in Our Stars",
    authors: "John Green",
    genres: "Young Adult, Romance",
    publication_date: "10/01/2012",
    isbn: "9780525478812"
  },
  {
    book_id: "215656584962",
    title: "The Hunger Games",
    authors: "Suzanne Collins",
    genres: "Dystopian, Adventure",
    publication_date: "14/09/2008",
    isbn: "9780439023528"
  },
  {
    book_id: "215656584963",
    title: "The Shining",
    authors: "Stephen King",
    genres: "Horror, Thriller",
    publication_date: "28/01/1977",
    isbn: "9780307743657"
  },
  {
    book_id: "215656584964",
    title: "The Picture of Dorian Gray",
    authors: "Oscar Wilde",
    genres: "Classic, Gothic",
    publication_date: "20/06/1890",
    isbn: "9780141439570"
  },
  {
    book_id: "215656584965",
    title: "Dracula",
    authors: "Bram Stoker",
    genres: "Horror, Classic",
    publication_date: "26/05/1897",
    isbn: "9780486411095"
  },
  {
    book_id: "215656584966",
    title: "Frankenstein",
    authors: "Mary Shelley",
    genres: "Horror, Classic",
    publication_date: "01/01/1818",
    isbn: "9780486282114"
  },
  {
    book_id: "215656584970",
    title: "Catch-22",
    authors: "Joseph Heller",
    genres: "War, Satire",
    publication_date: "10/11/1961",
    isbn: "9781451626650"
  },
  {
    book_id: "215656584971",
    title: "The Outsiders",
    authors: "S.E. Hinton",
    genres: "Young Adult, Drama",
    publication_date: "01/04/1967",
    isbn: "9780142407332"
  },
  {
    book_id: "215656584972",
    title: "The Road",
    authors: "Cormac McCarthy",
    genres: "Post-apocalyptic, Drama",
    publication_date: "26/09/2006",
    isbn: "9780307387134"
  },
  {
    book_id: "215656584973",
    title: "The Girl with the Dragon Tattoo",
    authors: "Stieg Larsson",
    genres: "Crime, Thriller",
    publication_date: "01/08/2005",
    isbn: "9780307454546"
  },
  {
    book_id: "215656584974",
    title: "The Alchemist",
    authors: "Paulo Coelho",
    genres: "Adventure, Philosophy",
    publication_date: "01/01/1988",
    isbn: "9780061122415"
  },
  {
    book_id: "215656584975",
    title: "The Divine Comedy",
    authors: "Dante Alighieri",
    genres: "Epic, Poem",
    publication_date: "01/01/1320",
    isbn: "9780142437223"
  },
  {
    book_id: "215656584976",
    title: "The Count of Monte Cristo",
    authors: "Alexandre Dumas",
    genres: "Adventure, Drama",
    publication_date: "28/08/1844",
    isbn: "9780140449266"
  }
];




// Updated insert to include `book_id`
const insertBook = db.prepare(`INSERT OR IGNORE INTO books (book_id, title, publication_date, isbn) VALUES (?, ?, ?, ?)`);

// Functions for handling authors and genres
const insertAuthor = db.prepare(`INSERT OR IGNORE INTO authors (name) VALUES (?)`);
const insertGenre = db.prepare(`INSERT OR IGNORE INTO genres (name) VALUES (?)`);
const linkBookAuthor = db.prepare(`INSERT OR IGNORE INTO book_authors (book_id, author_id) VALUES (?, ?)`);
const linkBookGenre = db.prepare(`INSERT OR IGNORE INTO book_genres (book_id, genre_id) VALUES (?, ?)`);

export const add_book = (book: Book_DB): boolean => {
  // Insert book (no duplicate ISBN constraint here)
  insertBook.run(book.book_id, book.title, book.publication_date, book.isbn);

  // Insert authors and link to book
  book.authors.split(',').map(author => author.trim()).forEach(author => {
    // Only insert author if not already present
    insertAuthor.run(author);
    const authorIdRow = db.prepare(`SELECT author_id FROM authors WHERE name = ?`).get(author) as { author_id: number };
    if (authorIdRow) {
      linkBookAuthor.run(book.book_id, authorIdRow.author_id); // Ensure link per book entry
    }
  });

  // Insert genres and link to book
  book.genres.split(',').map(genre => genre.trim()).forEach(genre => {
    // Only insert genre if not already present
    insertGenre.run(genre);
    const genreIdRow = db.prepare(`SELECT genre_id FROM genres WHERE name = ?`).get(genre) as { genre_id: number };
    if (genreIdRow) {
      linkBookGenre.run(book.book_id, genreIdRow.genre_id); // Ensure link per book entry
    }
  });
  return true;
};

// Insert sample data
sampleBooks.forEach(book => {
  add_book(book);
});

console.log('Sample books inserted.');
export default db;
