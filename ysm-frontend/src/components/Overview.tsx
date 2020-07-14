import React from 'react';

import {Button, makeStyles, Grid, Typography, Box, useMediaQuery, IconButton} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Menu, ExitToApp, VpnKey } from '@material-ui/icons';

import logo from '../assets/logo.png';
import illustration from '../assets/homepage-illustration.png';
import backgroundImage from '../assets/background.png'


const useStyles = makeStyles({
    container: {
      height: '100%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  });


function  Overview(){
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    defaultMatches: true
  });

  return (
      <Grid container justify="space-between" direction="column" alignItems="center" className={classes.container}>
          <Typography>Overview</Typography>
      </Grid>
  )
};

export default Overview;