import { Box, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import 'firebaseui/dist/firebaseui.css';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useWindowDimensions from '../shared/dimensions';
import { useStore } from '../store/store';
import theme from '../styles/theme';

const useStyles = makeStyles({
  screenContainer: {
    height: '100vh',
    margin: 0,
  },

});

function App({ Component, pageProps }) {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();

  const containerRef = useRef();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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
            <Box height={height} width={width} overflow="scroll" boxShadow={3} position="relative" ref={containerRef}>
              <Box flexGrow={1} display="flex" flexDirection="column">
                <Header menuContainer={containerRef} />
                <Box height={height * 0.875} overflow="scroll">
                  <Component {...pageProps} container={containerRef} />
                </Box>
                <Footer />
              </Box>
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
