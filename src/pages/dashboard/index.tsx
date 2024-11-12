import Grid from '@mui/material/Grid';
import RecentOrders from 'components/sections/dashboard/book-inventory-table';
import TopSelling from 'components/sections/dashboard/add-book';

const Dashboard = () => {
  return (
    <Grid container px={3.75} spacing={3.75}>
      <Grid item xs={12} md={9}>
        <RecentOrders />
      </Grid>
      <Grid item xs={12} md={3}>
        <TopSelling />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
