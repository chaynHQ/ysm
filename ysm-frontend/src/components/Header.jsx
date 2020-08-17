/* eslint-disable*/ 
//TODO: Remove this disable

import React from 'react';

import { Box, IconButton, makeStyles } from '@material-ui/core';
import { Menu, Search } from '@material-ui/icons';

const useStyles = makeStyles({
  container: {
    minHeight: 32,
  },
});

const Header = ({ menu, search }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignContent="flex-start"
      justifyContent="space-between"
      width={1}
      className={classes.container}
    >
      <Box display={menu ? 'block' : 'none'}>
        <IconButton>
          <Menu />
        </IconButton>
      </Box>
      <Box display={search ? 'block' : 'none'}>
        <IconButton>
          <Search />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
