

import {Book, Book_DB, ISBN10, ISBN13} from './common';
import axios from 'axios';


// Fetch books using search query from api and update book table
export const fetchData = async (searchText: string, setRows: React.Dispatch<React.SetStateAction<Book[]>>) => {
  try {
    const response = await axios.get(`http://localhost:4000/books`, {
      params: { search: searchText }, // Pass searchText as a query parameter if needed
    });

    const books_db = response.data as Book_DB[];
    const transed = convertToBookArray(books_db);
    setRows(transed); // Update the rows state with the new data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Post book to db via api
export const addBookDB = async (book: Book) => {

  // We convert internal Book representation to Book_DB
  const [day, month, year] = book.publication_date.toLocaleDateString().split('/')
  const db_book : Book_DB = {
    book_id: book.id,
    title: book.title,
    authors: book.authors.toString(), 
    genres: book.genres.toString(), 
    publication_date: `${day.padStart(2,'0')}/${month.padStart(2,'0')}/${year}`,
    isbn: writeISBN(book.isbn)   
  }

  try {
    // Send the book data in the body of the POST request
    const response = await axios.post(`http://localhost:4000/add`, db_book);
    // Assuming the server responds with a boolean indicating success
    return response.data as boolean;
  } catch (error) {
    // If an error occurs, log it to the console
    console.error('Error posting data:', error);
    return false;
  }
};

// Helper function to convert from Book_DB to Book
const convertToBookArray = (bookDbArray: Book_DB[]): Book[] => {
  return bookDbArray.map((bookDb) => {
    const [day, month, year] = bookDb.publication_date.split('/').map(Number);
    return {
      id: bookDb.book_id, 
      title: bookDb.title, 
      authors: bookDb.authors.split(',').map(author => author.trim()), 
      genres: bookDb.genres.split(',').map(genre => genre.trim()), 
      publication_date: new Date(year, month - 1, day), 
      isbn: parseISBN(bookDb.isbn), 
    };
  });
};

export const parseISBN = (isbn: string): ISBN10 | ISBN13 => {
  if(isbn.length == 13)
  {
    return {
      prefix : isbn.slice(0,3).split('').map(Number) as [number, number, number], 
      isbn10 : isbn.slice(3,13).split('').map(Number) as ISBN10
    }
  }
  else
  {
    return isbn.split('').map(Number) as ISBN10;
  }
};

const writeISBN = (isbn : ISBN10 | ISBN13) : string => {
  if ('prefix' in isbn)
  {
    return isbn.prefix.join('') + isbn.isbn10.join('');
  }
  else
  {
    return isbn.join('');
  }
}