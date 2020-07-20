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
  container: {
    minHeight: 32,
  },
});

// TODO: Dynamically show or don't show the icons
function Footer(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box display="flex" width={1} justifyContent="space-between" bgcolor="secondary.main" className={classes.container}>
      <Box display="flex" alignItems="center" paddingLeft={1}>
        <Box display={props.logo ? "block" : "none"}>
            <img src={logo} alt="Your story matters logo" className={classes.logo} />
            </Box>
        <Box display={props.loginLeft ? "block" : "none"}>
            <IconButton>
            <VpnKey color="primary" />
            </IconButton>
        </Box>
      </Box>
      <Box>
      <Box display={props.loginRight ? "block" : "none"}>
        <IconButton>
          <VpnKey color="primary" />
        </IconButton>
    </Box>
        <Box display={props.favourite ? "block" : "none"}>
        <IconButton color="primary">
          <Favorite />
        </IconButton>
        </Box>
        <Box display={props.directory ? "block" : "none"}>
        <IconButton color="primary">
          <Explore />
        </IconButton>
        </Box>
        <Box display={props.leave ? "block" : "none"}>
        <IconButton color="primary">
          <ExitToApp />
        </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
