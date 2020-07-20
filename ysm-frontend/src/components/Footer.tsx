import React from 'react';

import { makeStyles, Box, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ExitToApp, VpnKey, Favorite, Explore } from '@material-ui/icons';

import logo from '../assets/logo.png';

const useStyles = makeStyles({
  logo: {
    height: '1.5em',
    width: '1.5em',
  },
});

// TODO: Dynamically show or don't show the icons
function Footer() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box display="flex" width={1} justifyContent="space-between" bgcolor="secondary.main">
      <Box display="flex" alignItems="center" paddingLeft={1}>
        <img src={logo} alt="Your story matters logo" className={classes.logo} />
        <IconButton>
          <VpnKey color="primary" />
        </IconButton>
      </Box>
      <Box>
        <IconButton>
          <VpnKey color="primary" />
        </IconButton>
        <IconButton color="primary">
          <Favorite />
        </IconButton>
        <IconButton color="primary">
          <Explore />
        </IconButton>
        <IconButton color="primary">
          <ExitToApp />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
