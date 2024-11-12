import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const MainLayout = ({ children }: React.PropsWithChildren) => {

  return (
    <Stack>
      <Box mt={2}>{children}</Box>
    </Stack>
  );
};

export default MainLayout;
