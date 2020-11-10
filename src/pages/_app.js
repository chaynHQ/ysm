import { Box, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import 'firebaseui/dist/firebaseui.css';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Provider } from 'react-redux';
import Footer from '../components/Footer';
import Head from '../components/Head';
import Header from '../components/Header';
import Loading from '../components/Loading';
import firebase from '../config/firebase';
import { axiosGet } from '../shared/axios';
import isBrowser from '../shared/browserCheck';
import useWindowDimensions from '../shared/dimensions';
import { useStore } from '../store/store';
import theme from '../styles/theme';

const useStyles = makeStyles({
  screenContainer: {
    height: '100vh',
    margin: 0,
  },
  backgroundBlue: {
    background: 'url(\'/backgroundBlue.png\')',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },
  backgroundPeach: {
    background: 'url(\'/backgroundPeach.png\')',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },

});

function App({ Component, pageProps }) {
  const router = useRouter();
  const classes = useStyles();
  const { height, width } = useWindowDimensions();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [isLoading, setIsLoading] = useState(false);
  const [background, setBackground] = useState('peach');

  const containerRef = useRef();
  const scrollTopRef = useRef();

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

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
    router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  });

  useEffect(() => {
    const routesWithoutBackgrounds = ['/settings', '/saved', '/themes/[slug]'];
    const routesWithBlueBackgrounds = ['/resources/[resourceSlug]/items/[itemId]'];
    if (routesWithoutBackgrounds.includes(router.pathname)) {
      setBackground('None');
    } else if (routesWithBlueBackgrounds.includes(router.pathname)) {
      setBackground('Blue');
    } else {
      setBackground('Peach');
    }
  }, [router]);

  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head
        title="Your Story Matters"
      />
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
                className={classes[`background${background}`]}
              >
                <Box ref={scrollTopRef} />
                {
                  isLoading ? <Loading />
                    : (
                      <Component
                        {...pageProps}
                        container={containerRef}
                      />
                    )
}
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
