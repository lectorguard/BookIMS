import { useState, ChangeEvent, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import IconifyIcon from 'components/base/IconifyIcon';
import DataTable from './DataTable';
import Button from '@mui/material/Button';

interface InventoryProps {
  updateInventory: boolean;
}


const BookInventory = ({ updateInventory }: InventoryProps) => {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterColumn, setFilterColumn] = useState('');
  const [filterOperator, setFilterOperator] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFilter = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (filterColumn === '' || filterOperator === '' || filterValue === '')
    {
      alert("Column, operator and value are required.")
      return;
    }

    if (filterColumn === 'release')
    {
      if(isNaN(Number(filterValue)))
      {
        alert("Release filter must be numeric.")
        return;
      }
      setSearchText((prevText) => `{${filterColumn}${filterOperator}${Number(filterValue)}} ${prevText}`);
    }
    else if(filterColumn === 'isbn')
    {
      const result = filterValue.split('-').join('');
      if (isNaN(Number(result)))
      {
        alert("ISBN is invalid please enter valid ISBN.")
        return;
      }
      setSearchText((prevText) => `{${filterColumn}${filterOperator}${Number(result)}} ${prevText}`);
    }
    else setSearchText((prevText) => `{${filterColumn}${filterOperator}'${filterValue}'} ${prevText}`);

    setFilterColumn('');
    setFilterOperator('');
    setFilterValue('');
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <Paper sx={{ minHeight: 'auto', mb: 2 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        mt={-0.5}
        spacing={1.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" color="text.secondary">
          Book Inventory
        </Typography>

        <Box sx={{ display: 'flex', width: 0.85 }}>
          <TextField
            variant="filled"
            size="small"
            placeholder="Search here"
            value={searchText}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconifyIcon icon="prime:search" />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={toggleFilter} sx={{
              padding: 0.5, // Reduces padding for a smaller size
              marginLeft: 1, // Adds spacing from the search bar
              alignSelf: 'center', // Aligns it vertically with the search bar
          }}>
            <IconifyIcon icon="prime:filter" />
          </IconButton>
        </Box>
      </Stack>

      {filterVisible && (
        <Stack direction="row" spacing={1} mt={5} alignItems="center">
          <TextField
            select
            label="Column"
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
            size="small"
            InputProps={{ notched: false }}
            sx={{
              width: 120,
              '& .MuiInputBase-root': { padding: '0px', minHeight: '30px' },
              '& .MuiInputLabel-root': { fontSize: '0.875rem' },
              '& .MuiSelect-select': { padding: '4px' },
            }}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="genre">Genre</MenuItem>
            <MenuItem value="release">Release</MenuItem>
            <MenuItem value="isbn">ISBN</MenuItem>
          </TextField>
          <TextField
            select
            label="Operator"
            value={filterOperator}
            onChange={(e) => setFilterOperator(e.target.value)}
            size="small"
            InputProps={{ notched: false }}
            sx={{
              width: 120,
              '& .MuiInputBase-root': { padding: '0px', minHeight: '30px' },
              '& .MuiInputLabel-root': { fontSize: '0.875rem' },
              '& .MuiSelect-select': { padding: '4px' },
            }}
          >
            <MenuItem value="<">{"<"}</MenuItem>
            <MenuItem value=">">{">"}</MenuItem>
            <MenuItem value="=">{"="}</MenuItem>
          </TextField>

          <TextField
            label="Value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            size="small"
            InputProps={{ notched: false }}
            sx={{
              width: 300,
              '& .MuiInputBase-root': { padding: '1px', minHeight: '30px' },
              '& .MuiInputLabel-root': { fontSize: '0.875rem' },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleFilter}
          >
          Add
          </Button>
        </Stack>
      )}

      <Box mt={{ xs: 1.5, sm: 0.75 }} sx={{ mb: -3 }}>
        <DataTable
          searchText={searchText}
          updateInventory={updateInventory}
          //filterColumn={filterColumn}
          //filterOperator={filterOperator}
          //filterValue={filterValue}
        />
      </Box>
    </Paper>
  );
};

export default BookInventory;
