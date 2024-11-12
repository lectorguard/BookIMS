import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {parseISBN, addBookDB} from 'database/requests'
import { Book } from 'database/common';


interface AddBookProps {
  setInventoryUpdate: (p: boolean) => void;
}

const AddBookForm = ({setInventoryUpdate}: AddBookProps) => {

  const [book, setBook] = useState({
    id : 0,
    title: '',  // Set default value for title
    authors: '', // Set default value for author
    genres: '',         // Set default value for genre
    publication_date: '',    // Set default value for release
    isbn: ''   // Set default value for ISBN
  });

  const [error, setError] = useState({
     title: '', 
     authors: '',
     genres : '',
     publication_date :'',
     isbn : '' 
  });


  const [toUpload, setUpload] = useState<Book>();

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value, // Update title in book object
    }));
  };

  function isValidDate(value: string): boolean {
    // Regular expression for both yyyy and mm-yyyy formats
    const regex = /^(?:\d{4}|\d{2}-\d{4})$/;
  
    if (!regex.test(value)) {
      return false;
    }
  
    // If the format is mm-yyyy, we need to validate the month part
    if (value.length === 7) {
      const month = value.split('-').map(Number)[0];
  
      // Check if the month is in the valid range (1-12)
      if (month < 1 || month > 12) {
        return false;
      }
    }
    return true;
  }
  
  function isValidISBN(isbn: string): boolean {
    // Regular expression to match either 'nnn-nnnnnnnnnn' or 'nnnnnnnnnn'
    const regex = /^(?:\d{3}-\d{10}|\d{10})$/;
    return regex.test(isbn);
  }


  const generateNumericUUID = () => {
    return Date.now() + Math.floor(Math.random() * 1000000);
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let succ = true;
    setError(() => ({title : "",  authors: "", genres : "", publication_date : "",  isbn : "" }));
    // Handle title 
    if(book.title.length == 0)
    {
      setError((err) => ({...err, title : "Title is required"}));succ = false;
    }
    // Handle authors
    if(book.authors.length == 0)
    {
      setError((err) => ({...err, authors : "Author is required"}));succ = false;
    }
    else if(book.authors.split(',').some((author) => author.trim().length == 0))
    {
      setError((err) => ({...err, authors : "Comma seperated authors can not be empty"}));succ = false;
    }

    // Handle genre
    if(book.genres.length == 0)
    {
      setError((err) => ({...err, genres : "Genre is required"}));succ = false;
    }
    else if(book.genres.split(',').some((genre) => genre.trim().length == 0))
    {
      setError((err) => ({...err, genres : "Comma seperated genres can not be empty"}));succ = false;
    }
    // Handle date
    if(book.publication_date.length == 0)
    {
      setError((err) => ({...err, publication_date : "Release is required"}));succ = false;
    }
    else if (!isValidDate(book.publication_date))
    {
      setError((err) => ({...err, publication_date : "Please enter a valid date in formation yyyy or mm-yyyy"}));
      succ = false;
    }
    // Handle ISBN
    if (book.isbn.length == 0)
    {
      setError((err) => ({...err, isbn : "Please enter a valid ISBN10 or ISBN13"}));succ = false;
    }
    else if (!isValidISBN(book.isbn))
    {
      setError((err) => ({...err, isbn : "Please provide isbn in format 123-0123456789 or 0123456789"}));succ = false;
    }

    if (succ)
    {
        const [month, year] = book.publication_date.length > 4 ? 
          book.publication_date.split('-') :
          ['01', book.publication_date];
        const temp : Book = {
          id : String(generateNumericUUID()),
          title : book.title,
          authors : book.authors.split(',').map(author => author.trim()),
          genres : book.genres.split(',').map(genre => genre.trim()),
          publication_date : new Date(`${year}-${month}-01`),
          isbn : parseISBN(book.isbn.replace(/-/g, ''))
        }
        // When you set uploadSuccess to true, ensure that the effect will trigger
        setUpload(temp);
    }    
  };

  useEffect(() => {
    if (uploadSuccess) {

      const timer = setTimeout(() => {
        setUploadSuccess(false);
      }, 2000);

      // Clean up the timer when the component unmounts or uploadSuccess changes
      return () => clearTimeout(timer);
    }
  }, [uploadSuccess]); 

  useEffect(() => {
    if (toUpload)
    {
      addBookDB(toUpload);
      setUploadSuccess(true);
      setInventoryUpdate(true);
    }
  }, [toUpload]);


  return (
    <Paper sx={{ padding: 0 }}>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={5}>
            <Grid item xs={12}>
              <Tooltip title="Enter Title (e.g. The Hobbit)" arrow>
                <TextField
                  label="Book Title"
                  variant="outlined"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{ notched: false }}
                  error={error.title.length > 0}
                  helperText={error.title}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
            <Tooltip title="Enter Authors (e.g. Neil Gaiman, Terry Pratchett)" arrow>
              <TextField
                label="Author(s)"
                variant="outlined"
                name="authors"
                value={book.authors}
                onChange={handleChange}
                fullWidth
                InputProps={{ notched: false }}
                error={error.authors.length > 0}
                helperText={error.authors}
              />
            </Tooltip>
            </Grid>
            <Grid item xs={12}>
            <Tooltip title="Enter Genres (e.g. Horror, Drama)" arrow>
              <TextField
                label="Genre(s)"
                variant="outlined"
                name="genres"
                value={book.genres}
                onChange={handleChange}
                fullWidth
                InputProps={{ notched: false }}
                error={error.genres.length > 0}
                helperText={error.genres}
              />
            </Tooltip>
            </Grid>
            <Grid item xs={12}>
            <Tooltip title="Enter Release (e.g. 10-2023)" arrow>
              <TextField
                label="Release"
                variant="outlined"
                name="publication_date"
                value={book.publication_date}
                onChange={handleChange}
                fullWidth
                InputProps={{ notched: false }}
                error={error.publication_date.length > 0}
                helperText={error.publication_date}
              />
            </Tooltip>
            </Grid>
            <Grid item xs={12}>
            <Tooltip title="Enter ISBN (e.g. 123-1234567890 or 0123456789)" arrow>
              <TextField
                label="ISBN"
                variant="outlined"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
                fullWidth
                InputProps={{ notched: false }}
                error={error.isbn.length > 0}
                helperText={error.isbn}
              />
            </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Book
              </Button>
            </Grid>
            <Grid item xs={12}>
            <>
              {uploadSuccess && <p style={{ color: 'green' }}>"Successfully inserted book!"</p>}
            </>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Paper>
  );
};



const AddBook = ({setInventoryUpdate}: AddBookProps) => {
  return (
    <Paper sx={{ height: 'auto', padding: 3 }}>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Add a New Book
      </Typography>
      <Box mt={5}>
        <AddBookForm setInventoryUpdate={setInventoryUpdate}/>
      </Box>
    </Paper>
  );
};

export default AddBook;
