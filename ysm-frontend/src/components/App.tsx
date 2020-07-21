import React, { ReactElement } from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { isMobile } from 'react-device-detect';
import Home from './Home';
import Overview from './Overview';

import backgroundImage from '../assets/background.png';

const useStyles = makeStyles({
  screenContainer: {
    height: '100vh',
    backgroundColor: '#FFF5F0',
  },

  pageContainerDesktop: {
    height: 731,
    width: 752,
  },

  pageContainerMobile: {
    height: '100vh',
    width: '100vw',
  },

  appContainer: {
    padding: 0,
  },
});

const App: React.FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <Box
      className={classes.screenContainer}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box boxShadow={3}>
        <Container
          className={`${classes.appContainer} ${
            isMobile ? classes.pageContainerMobile : classes.pageContainerDesktop
          }`}
        >
          <Box display="flex" flexDirection="column" height={1}>
            <Box flexGrow={1}>
              <BrowserRouter>
                <Switch>
                  <Route path="/overview">
                    <Overview />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </BrowserRouter>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
