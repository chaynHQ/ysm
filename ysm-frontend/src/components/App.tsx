import React from 'react';
import logo from './logo.svg';
import styles from '../styles/app.module.css';
import {Container, Box, Grid} from '@material-ui/core';
import Page from './Page'

import {isMobile} from 'react-device-detect';



const App = () => (
  <Box 
    className={styles.appContainer} 
    display="flex" 
    alignItems="center"
    justifyContent="center">

      <Box boxShadow={3}>
        <Container maxWidth="sm">
          <Page />
        </Container>
      </Box>
  </Box>
);

export default App;
