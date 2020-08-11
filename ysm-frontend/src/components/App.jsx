import React, { ReactElement, useEffect } from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { isMobile } from 'react-device-detect';
import Home from './Home';
import Overview from './Overview';
import SignIn from './SignIn';
import Settings from './Settings';
import firebase from '../config/firebase';

import { setUserSignIn } from '../store/actions';


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

const App= (props) => {
  const classes = useStyles();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      props.setUserSignIn(user)
    });

  });

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
                  <Route path="/signin" render={(props) => <SignIn {...props}/>}/>
                  <Route path="/overview">
                    <Overview />
                  </Route>
                  <Route path="/settings" component={Settings}/>
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

const mapDispatchToProps = (dispatch) => ({
  setUserSignIn: (user) => dispatch(setUserSignIn(user)),
});

export default connect(null, mapDispatchToProps)(App);
