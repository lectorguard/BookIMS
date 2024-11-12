import Grid from '@mui/material/Grid';
import BookInventory from 'components/sections/dashboard/book-inventory-table';
import AddBook from 'components/sections/dashboard/add-book';
import { useState, useEffect } from 'react';

const Dashboard = () => {


  const [updateInventory, setUpdateInventory] = useState(false);

  useEffect(() => {
    setUpdateInventory(false);
  }, [updateInventory]);

  return (
    <Grid container px={3.75} spacing={3.75}>
      <Grid item xs={12} md={9}>
        <BookInventory updateInventory={updateInventory} />
      </Grid>
      <Grid item xs={12} md={3}>
        <AddBook setInventoryUpdate={setUpdateInventory}/>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
