import React from 'react';

import { Box, IconButton, makeStyles } from '@material-ui/core';
import { Menu, Search } from '@material-ui/icons';

const useStyles = makeStyles({
  container: {
    minHeight: 32,
  },
});
type HeaderProps = {
  menu?: boolean;
  search?: boolean;
};
// TODO: Dynamically show the search button

const Header: React.FC<HeaderProps> = ({ menu, search }: HeaderProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignContent="flex-start" justifyContent="space-between" width={1} className={classes.container}>
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
