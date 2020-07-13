import React from 'react';
import logo from './logo.svg';
import styles from '../styles/app.module.css';
import {Container, Box, makeStyles} from '@material-ui/core';

import Page from './Page'

import {isMobile} from 'react-device-detect';

const useStyles = makeStyles({
  appContainer: {
    height: '100vh',
    backgroundColor: '#FFF5F0',
  },
  
  pageContainerDesktop : {
    height:731,
    width:752,
  },
  
  pageContainerMobile:  {
    height:'100vh',
    width:'100vw',
  },

  container: {
    padding: 0,
  }
});




function App() {
  const classes = useStyles();

  return (  <Box 
    className={classes.appContainer} 
    display="flex" 
    alignItems="center"
    justifyContent="center">

      <Box boxShadow={3}>
        <Container className={`${classes.container} ${isMobile ? classes.pageContainerMobile : classes.pageContainerDesktop}`}>
          <Page />
        </Container>
      </Box>
  </Box>)
};

export default App;
