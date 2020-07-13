import React from 'react';
import styles from '../styles/page.module.css';
import {Container, Button, makeStyles, Grid, Typography} from '@material-ui/core';
import logo from '../assets/logo.png';
import backgroundImage from '../assets/background.png'

const useStyles = makeStyles({
    logo: {
      height: 48,
    },
    container: {
      height: '100%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  });
  

// TODO: Set background
// TODO: Set styles
function  Page(){
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container justify="center" direction="column" alignItems="center">
        <img 
            src={logo}
            alt={'Your story matters logo'}
            className={classes.logo} 
        />
        <Typography>If you’ve been treated in a way that has made you feel uncomfortable or violated, use YSM to find out how to get support.</Typography>
        <Typography>Let YSM be your companion because You Are Not Alone.</Typography>
        <Button variant="contained" color="primary">START YOUR JOURNEY</Button>
      </Grid>
    </Container>
  )
};

export default Page;