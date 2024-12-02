import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader = () => (
  <Box
    display="flex"
    height="100vh"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress />
  </Box>
)

export default Loader;