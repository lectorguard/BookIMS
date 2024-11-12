import { useState, ChangeEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const AddBookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle book submission logic here
    console.log('Book added:', book);
  };


  return (
    <Paper sx={{ padding: 0 }}>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                label="Book Title"
                variant="outlined"
                name="title"
                value={book.title}
                onChange={handleChange}
                fullWidth
                InputProps={{ notched: false }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author"
                variant="outlined"
                name="author"
                value={book.author}
                onChange={handleChange}
                fullWidth
                InputProps={{ notched: false }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Genre"
                variant="outlined"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                fullWidth
                InputProps={{ notched: false }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Paper>
  );
};

const TopSelling = () => {
  return (
    <Paper sx={{ height: 'auto', padding: 3 }}>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Add a New Book
      </Typography>
      <Box mt={5}>
        <AddBookForm />
      </Box>
    </Paper>
  );
};

export default TopSelling;
