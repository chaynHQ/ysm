import React from 'react';

import {
  Button,
  makeStyles,
  Grid,
  Typography,
  Box,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Menu, ExitToApp, VpnKey } from '@material-ui/icons';

import logo from '../assets/logo.png';
import illustration from '../assets/homepage-illustration.png';

const useStyles = makeStyles({
  container: {
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    defaultMatches: true,
  });

  return (
    <Grid
      container
      justify="space-between"
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <img src={logo} alt="Your story matters logo" width={isMobile ? '25%' : '15%'} />
      <img
        src={illustration}
        alt="Illustration of woman writing in a journal"
        width={isMobile ? '85%' : '50%'}
      />
      <Typography align="center">
        If you&apos;ve been treated in a way that has made you feel uncomfortable or violated, let
        YSM be your companion because your story matters.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/overview">
        START
      </Button>
      <Typography align="center" variant="subtitle2" color="textSecondary">
        If you&apos;re in crisis click here.
      </Typography>
    </Grid>
  );
}

export default Home;
