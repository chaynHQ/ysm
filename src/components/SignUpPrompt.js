import {
  Box,
  Button, makeStyles,
  Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../config/firebase';
import isBrowser from '../shared/browserCheck';
import useWindowDimensions from '../shared/dimensions';

const useStyles = makeStyles((theme) => ({
  card: {
    height: 200,
    margin: 6,
  },
  cardMedia: {
    height: '100%',
  },
  cardContent: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    boxShadow: 'inset 0 0 0 1000px rgba(36, 42, 74, 0.3)',
  },
  iconContainer: {
    backgroundColor: theme.palette.secondary.light,
    padding: '10%',
    borderRadius: 180,
  },
  icon: {
    width: '100%',
  },
  link: {
    color: theme.palette.error.main,
  },
  linkSubtitle: {
    margin: 0,
  },
}));

const SignUpPrompt = () => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  return (
    <Box
      display="flex"
      flexDirection="column"
      pt={3.5}
      px={2}
    >
      {user ? null
        : (
          <Box
            display="flex"
            flexDirection="column"
            height={1}
            justifyContent="center"
            alignItems="center"
          >
            <Box className={classes.iconContainer} width={width * 0.3} height={width * 0.3} mb={4}>
              <img
                className={classes.icon}
                alt="YSM Logo"
                src="/logo.png"
              />
            </Box>
            <Typography variant="h1" align="center">Sign up, it’s free</Typography>
            <Typography align="center">
              Sign up to Your Story Matters and privately save resources for later.
            </Typography>
            <Link href="/sign-in">
              <Button variant="contained" disableElevation color="primary" component="a" to="/sign-in">
                Create Your Account
              </Button>
            </Link>
            <Box width="50%" display="flex" flexDirection="column" alignItems="center">
              <Typography align="center" variant="subtitle1" className={classes.linkSubtitle}>
                Your privacy will be protected.
              </Typography>
              <Typography align="center">
                Read our
                {' '}
                <Link href="/info/terms-and-conditions">
                  <LinkUi
                    component="a"
                    color="textPrimary"
                    underline="always"
                    to="/privacy"
                    align="center"
                  >

                    Terms

                  </LinkUi>
                </Link>
                {' '}
                &
                {' '}
                <Link href="/info/privacy">
                  <LinkUi
                    component="a"
                    color="textPrimary"
                    underline="always"
                    to="/privacy"
                    align="center"
                  >
                    Privacy Policy
                    {' '}
                  </LinkUi>
                </Link>

              </Typography>
            </Box>
          </Box>
        ) }

    </Box>
  );
};

export default SignUpPrompt;
