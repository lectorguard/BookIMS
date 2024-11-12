import express, { Request, Response } from 'express';
import db ,{add_book} from './db'; // Assuming db.ts is exporting the database instance
import {Book_DB} from './common'
import cors from 'cors';

const app = express();
const PORT = 4000;


app.use(cors());
app.use(express.json());

// Define a type for the books data


// Endpoint to get all books with authors and genres
app.get('/books', (_req: Request, res: Response): void => {
    const books: Book_DB[] = db.prepare(`
      SELECT books.book_id, books.title, books.publication_date, books.isbn,
             GROUP_CONCAT(authors.name) AS authors,
             GROUP_CONCAT(genres.name) AS genres
      FROM books
      LEFT JOIN book_authors ON books.book_id = book_authors.book_id
      LEFT JOIN authors ON book_authors.author_id = authors.author_id
      LEFT JOIN book_genres ON books.book_id = book_genres.book_id
      LEFT JOIN genres ON book_genres.genre_id = genres.genre_id
      GROUP BY books.book_id
    `).all() as Book_DB[]; 
    res.json(books);
  });

  // Expect req as Book_DB
  app.post('/add', (req: Request, res: Response): void => {
    console.log("Before:", req.body);
    const toInsert : Book_DB = req.body;
    console.log("Received body:", toInsert);

    const result = add_book(toInsert);
    res.json(result);
    //res.json(true);
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });


