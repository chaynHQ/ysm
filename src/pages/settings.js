import {
  Box, Button, Card, CardActions, CardContent, makeStyles, TextField, Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack } from '@material-ui/icons';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect } from 'react-redux';
import NewsletterSignup from '../components/NewsletterSignup';
import firebase from '../config/firebase';
import { axiosGet } from '../shared/axios';
import isBrowser from '../shared/browserCheck';
import { setSettingsAuth, setUserSignIn } from '../store/actions';

const SignUpWidget = dynamic(
  () => import('../components/SignUpWidget'),
  { ssr: false },
);

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
}));

const Settings = ({
  setSettingsAuthOnError, settingsAuth, setUserSignInOnClick,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const logout = () => {
    setUserSignInOnClick({});
    setSettingsAuthOnError(false);
    axiosGet('/preview', {
      params: {
        revokeAccess: true,
      },
    });
    firebase.auth().signOut();
  };

  const resetPassword = (newPassword) => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        u.updatePassword(newPassword).then(() => {
          setPasswordError(false);
          logout();
        }).catch((error) => {
          if (error.code === 'auth/weak-password') {
            setPasswordError(true);
          } else if (error.code === 'auth/requires-recent-login') {
            setSettingsAuthOnError(false);
          }
        });
      } else {
        // No user is signed in.
      }
    });
  };

  const resetEmail = (newEmail) => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        u.updateEmail(newEmail).then(() => {
          setEmailError(false);
        }).catch((error) => {
          if (error.code === 'auth/requires-recent-login') {
            setSettingsAuthOnError(false);
          } else {
            setEmailError(true);
          }
        });
      } else {
        // No user is signed in.
      }
    });
  };

  const updateName = (newName) => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        u.updateProfile({
          displayName: newName,
        }).then(() => {
          // Update successful.
          setNameError(false);
        }).catch(() => {
          setNameError(true);
        });
      } else {
        // No user is signed in.
      }
    });
  };

  return (
    <Box display="flex" flexDirection="column" height={1}>
      { settingsAuth
        ? (
          <Box>
            <Box display="flex" justifyContent="space-between" px={3} pt={2} bgcolor="info.light">
              <Link href="/saved" passHref>
                <LinkUi component="a" underline="always" color="inherit">
                  <Box display="flex" alignItems="center">
                    <ArrowBack className={classes.icon} />
                    <Typography variant="subtitle1">Saved for later</Typography>
                  </Box>
                </LinkUi>
              </Link>
              <Typography
                onClick={() => {
                  logout();
                  router.push('/');
                }}
              >
                Log out
              </Typography>
            </Box>

            <Box p={4}>
              <Typography align="center" variant="h1">My Account</Typography>
            </Box>

            <Box display="flex" flexDirection="column" width={1} px={5}>
              <Box pb={2} width={1}>
                <TextField
                  id="Display Name"
                  placeholder={user.displayName}
                  variant="outlined"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  fullWidth
                  error={nameError}
                  helperText={nameError ? 'We had a problem updating your name. Please try again' : null}
                />
              </Box>
              <Button color="primary" variant="contained" disableElevation onClick={() => { updateName(name); }}>
                Update
              </Button>
            </Box>

            <Box display="flex" flexDirection="column" width={1} my={5} px={5}>
              <Box pb={2} width={1}>
                <TextField
                  id="Email"
                  placeholder={user.email}
                  variant="outlined"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  fullWidth
                  error={emailError}
                  helperText={emailError ? "We couldn't update your email, it could already be in use by another user or it's not formatted correctly. Please try again." : null}
                />
              </Box>
              <Button color="primary" variant="contained" disableElevation onClick={() => { resetEmail(email); }}>
                Update
              </Button>
            </Box>

            <NewsletterSignup />

            <Box mx={5} mb={5}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography align="center" variant="h2">Set a new password</Typography>
                  <Typography align="center">Must be at least 6 characters long. You will be logged out and will need to sign in again.</Typography>
                </CardContent>
                <CardActions>
                  <Box display="flex" flexDirection="column" width={1} mb={5} px={5}>
                    <Box pb={2} width={1}>
                      <TextField
                        id="Password"
                        variant="outlined"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                        fullWidth
                        error={passwordError}
                        helperText={passwordError ? "We couldn't update your password, it's not strong enough. Please try again with a password that is at least 6 characters long." : null}
                      />
                    </Box>
                    <Button color="primary" variant="contained" disableElevation onClick={() => { resetPassword(password); }}>
                      Update
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Box>
            <Box />

            <Box mx={5} mb={5}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography align="center" variant="h2">Want to delete your account?</Typography>
                  <Typography align="center">Account deletion is final. You won’t be able to restore your account or recuperate your saved items if you delete your account.</Typography>
                  <Typography align="center">In order to comply with local and international regulations, it may take up to two weeks for your account to be entirely removed from our systems.</Typography>
                </CardContent>
                <CardActions>
                  <Box display="flex" flexDirection="column" width={1} mb={5} px={5}>
                    <LinkUi color="error" underline="always" component="a" variant="h2" align="center" href={`mailto:team@ysm.io?subject=Request Account Deletion&body=Request Deletion for ${user.name} (Email: ${user.email})`}>
                      Request Account Deletion
                    </LinkUi>
                  </Box>
                </CardActions>
              </Card>
            </Box>
            <Box />

          </Box>
        )
        : <SignUpWidget redirectUrl="/settings" />}
    </Box>
  );
};

Settings.propTypes = {
  setSettingsAuthOnError: PropTypes.func.isRequired,
  setUserSignInOnClick: PropTypes.func.isRequired,
  settingsAuth: PropTypes.bool,
};

Settings.defaultProps = {
  settingsAuth: false,
};

const mapStateToProps = (state) => ({
  settingsAuth: state.user.settingsAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setSettingsAuthOnError: (bool) => dispatch(setSettingsAuth(bool)),
  setUserSignInOnClick: (user) => dispatch(setUserSignIn(user)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
