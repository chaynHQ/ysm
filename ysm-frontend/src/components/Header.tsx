import React from 'react';

import { Box, IconButton, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Menu, Search } from '@material-ui/icons';

const useStyles = makeStyles({
  container: {
    minHeight: 32,
  },
});

// TODO: Dynamically show the search button

function Header(props: any) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box display="flex" alignContent="flex-start" width={1} className={classes.container}>
      <Box display={props.menu ? "block" : "none"}>
        <IconButton >
          <Menu />
        </IconButton>
      </Box>
      <Box display={props.search ? "block" : "none"}>
        <IconButton>
          <Search />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Header;
