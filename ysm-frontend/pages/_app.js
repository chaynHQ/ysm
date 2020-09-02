import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Container, Box, makeStyles } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import theme from '../styles/theme';

import useWindowDimensions from '../shared/dimensions';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

function App({ Component, pageProps }) {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

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
              <Box flexGrow={1} display="flex" flexDirection="column" height={1}>
                <Header />
                <Box minHeight={height * 0.875} overflow="scroll">
                  <Component {...pageProps} />
                </Box>
                <Footer />
              </Box>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
