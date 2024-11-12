import Database from 'better-sqlite3';
import { Book_DB } from './common';

const db = new Database('books.db');

db.exec('PRAGMA foreign_keys = ON;');

// Update table creation to allow `book_id` as an external UUID instead of auto-incrementing
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    book_id TEXT PRIMARY KEY,  -- use UUID passed from the app
    title TEXT NOT NULL,
    publication_date TEXT,
    isbn TEXT NOT NULL  -- Remove the UNIQUE constraint here
  );
`);

// Create tables for authors, genres, book_authors, and book_genres (no changes here)
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
const sampleBooks: Book_DB[] = [
  {
    book_id: '1',
    title: 'The Hobbit',
    authors: 'J.R.R. Tolkien',
    genres: 'Fantasy',
    publication_date: '12/02/1808',
    isbn: '9780007118366'
  },
  {
    book_id: '2',
    title: 'Good Omens',
    authors: 'Neil Gaiman, Terry Pratchett',
    genres: 'Fantasy, Comedy',
    publication_date: '03/02/1808',
    isbn: '9780060853983'
  },
  {
    book_id: '3',
    title: 'Good Omens old isbn',
    authors: 'Neil Gaiman, Terry Pratchett',
    genres: 'Fantasy, Comedy',
    publication_date: '07/10/1602',
    isbn: '9780060853'
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
    insertAuthor.run(author);
    const authorIdRow = db.prepare(`SELECT author_id FROM authors WHERE name = ?`).get(author) as { author_id: number };
    linkBookAuthor.run(book.book_id, authorIdRow.author_id); // Ensure link per book entry
  });

  // Insert genres and link to book
  book.genres.split(',').map(genre => genre.trim()).forEach(genre => {
    insertGenre.run(genre);
    const genreIdRow = db.prepare(`SELECT genre_id FROM genres WHERE name = ?`).get(genre) as { genre_id: number };
    linkBookGenre.run(book.book_id, genreIdRow.genre_id); // Ensure link per book entry
  });

  return true;
};

// Insert sample data
sampleBooks.forEach(book => {
  add_book(book);
});

console.log('Sample books inserted.');
export default db;
