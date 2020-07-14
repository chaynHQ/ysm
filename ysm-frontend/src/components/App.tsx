import React from 'react';
import {Container, Box, makeStyles} from '@material-ui/core';

import Home from './Home'

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
          <Home />
        </Container>
      </Box>
  </Box>)
};

export default App;
