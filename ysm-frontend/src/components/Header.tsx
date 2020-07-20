import React from 'react';

import { Box, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Menu, Search } from '@material-ui/icons';

// TODO: Dynamically show the search button

function Header() {
  const theme = useTheme();

  return (
    <Box display="flex" alignContent="flex-start" width={1}>
      <IconButton>
        <Menu />
      </IconButton>
      <IconButton>
        <Search />
      </IconButton>
    </Box>
  );
}

export default Header;
