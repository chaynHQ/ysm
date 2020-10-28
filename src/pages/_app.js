import { Box, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import 'firebaseui/dist/firebaseui.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Provider } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import firebase from '../config/firebase';
import useWindowDimensions from '../shared/dimensions';
import { axiosGet } from '../store/axios';
import { useStore } from '../store/store';
import theme from '../styles/theme';

const useStyles = makeStyles({
  screenContainer: {
    height: '100vh',
    margin: 0,
  },
  background: {
    background: 'url(\'./background.png\')',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },

});

const isBrowser = typeof window !== 'undefined';

function App({ Component, pageProps }) {
  const router = useRouter();
  const classes = useStyles();
  const { height, width } = useWindowDimensions();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  const containerRef = useRef();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    // This effect is called everytime the user changes because firebase has updated the token
    // or if the router changes (i.e the user navigates)
    const checkTermsAcceptance = async (u) => {
      const serverUser = await axiosGet('/profile',
        {
          headers: {
            authorization: `Bearer ${u.xa}`,
          },
        });
      return serverUser.termsAccepted;
    };
    if (user && user.emailVerified) {
      checkTermsAcceptance(user).then((termsAccepted) => {
        // If there is a verified user but they haven't accepted the terms, reroute them to sign-in
        if (!termsAccepted) {
          router.push('/sign-in');
        }
      });
    } else if (user && !user.emailVerified) {
      // If there is a user but they aren't verified log them out
      firebase.auth().signOut();
    }
  }, [user]);

  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            bgcolor="primary.light"
            className={classes.screenContainer}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box height={height} width={width} overflow="hidden" boxShadow={3} position="relative" ref={containerRef} display="flex" flexDirection="column">
              <Header menuContainer={containerRef} />
              <Box
                display="flex"
                flexDirection="column"
                flexGrow={1}
                overflow="scroll"
                className={classes.background}
              >
                <Component {...pageProps} container={containerRef} />
              </Box>
              <Footer />
            </Box>
          </Box>
        </ThemeProvider>
      </Provider>
    </>
  );
}
export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};
