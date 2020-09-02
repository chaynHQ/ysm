import React, { useEffect } from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { isMobile } from 'react-device-detect';
import Home from './Home';
import YourJourney from './YourJourney';
import Theme from './Theme';
import SignIn from './SignIn';
import Settings from './Settings';
import firebase from '../config/firebase';
import Header from './Header';
import Footer from './Footer';
import NotFoundError from './NotFoundError';
import Search from './Search';

import { setUserSignIn } from '../store/actions';

import useWindowDimensions from '../shared/dimensions';

const useStyles = makeStyles({
  screenContainer: {
    height: '100vh',
    backgroundColor: '#FFF5F0',
    margin: 0,
  },

  pageContainerMobile: {
    height: '100vh',
    width: '100vw',
  },

  appContainer: {
    padding: 0,
    overflow: 'scroll',
  },
});

const App = ({ setUserSignInOnAuthChange }) => {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUserSignInOnAuthChange(user);
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
            isMobile ? classes.pageContainerMobile : null
          }`}
          style={{
            height,
            width,
          }}
        >
          <BrowserRouter>
            <Box flexGrow={1} display="flex" flexDirection="column" height={1}>
              <Header />
              <Box minHeight={height * 0.875} overflow="scroll">
                <Switch>
                  <Route path="/signin" render={(props) => <SignIn redirectUrl={props.redirectUrl} />} />
                  <Route path="/your-journey/:themeSlug" component={Theme} />
                  <Route path="/your-journey" component={YourJourney} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/search" component={Search} />

                  <Route exact path="/" component={Home} />
                  <Route path="*" component={NotFoundError} />

                </Switch>
              </Box>
              <Footer />
            </Box>
          </BrowserRouter>
        </Container>
      </Box>
    </Box>
  );
};

App.propTypes = {
  redirectUrl: PropTypes.string,
  setUserSignInOnAuthChange: PropTypes.func.isRequired,
};

App.defaultProps = {
  redirectUrl: '',
};

const mapDispatchToProps = (dispatch) => ({
  setUserSignInOnAuthChange: (user) => dispatch(setUserSignIn(user)),
});

export default connect(null, mapDispatchToProps)(App);
