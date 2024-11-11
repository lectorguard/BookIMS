import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
//import Sidebar from './sidebar';
//import Topbar from './topbar';
//import Footer from './footer';

const MainLayout = ({ children }: React.PropsWithChildren) => {
  //const [expand, setExpand] = React.useState(false);
  //const [mobileOpen, setMobileOpen] = React.useState(false);

  //const drawerWidth = 240;
  //const miniDrawerWidth = 90;

  return (
    <Stack>
      <Box mt={2}>{children}</Box>
    </Stack>
  );
};

export default MainLayout;
