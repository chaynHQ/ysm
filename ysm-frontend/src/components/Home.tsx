import React from 'react';

import {Button, makeStyles, Grid, Typography, Box, useMediaQuery, IconButton} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

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


function  Home(){
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    defaultMatches: true
  });

  const StartButton = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
  ));

  return (
      <Grid container justify="space-between" direction="column" alignItems="center" className={classes.container}>
        <Box display="flex" alignContent="flex-start" width={1}>
          <IconButton>
            <Menu/>
          </IconButton>
        </Box>
        <img 
            src={logo}
            alt={'Your story matters logo'}
            width={isMobile ? "25%" : '15%'}
        />
        <img 
            src={illustration}
            alt={'Illustration of woman writing in a journal'}
            width={isMobile ? "85%" : '50%'}
        />
        <Typography align="center">If you’ve been treated in a way that has made you feel uncomfortable or violated, let YSM be your companion because your story matters.</Typography>
          <Button 
            variant="contained"
            color="primary"
            >
            START
          </Button>
        <Typography align="center" variant="subtitle2" color="textSecondary">If you're in crisis click here.</Typography>
        <Box 
          display="flex" 
          width={1}
          justifyContent="space-between"
          >
          <IconButton>
            <VpnKey color="secondary"/>
          </IconButton>
          <IconButton color="secondary">
            <ExitToApp/>
          </IconButton>
        </Box>
      </Grid>
  )
};

export default Home;