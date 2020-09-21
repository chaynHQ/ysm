import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Box, Button, TextField, Typography, makeStyles, Breadcrumbs, Card, CardActions, CardContent,
} from '@material-ui/core';
import Link from 'next/link';
import LinkUi from '@material-ui/core/Link';
import {
  ArrowBack,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { setSettingsAuth, setUserSignIn } from '../store/actions';

import firebase from '../config/firebase';

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
}));

const Settings = ({
  setSettingsAuthOnError, settingsAuth, user, setUserSignInOnClick,
}) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetPassword = (newPassword) => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        u.updatePassword(newPassword).then(() => {
          // Update successful.
        }).catch((error) => {
          if (error.code === 'auth/weak-password') {
            // Show some sort of weak password message
          } else if (error.code === 'auth/requires-recent-login') {
            setSettingsAuthOnError(false);
          } else {
            throw error;
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
          // Update successful.
        }).catch((error) => {
          if (error.code === 'auth/requires-recent-login') {
            setSettingsAuthOnError(false);
          } else {
            throw error;
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
        }).catch((error) => {
          throw error;
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
            <Box display="flex" justifyContent="space-between" px={3} pt={2} bgcolor="#FFEAE3">
              <Breadcrumbs aria-label="breadcrumb">
                <Link href="/" passHref>
                  <LinkUi component="a" color="inherit">
                    <Box display="flex" alignItems="center">
                      <ArrowBack className={classes.icon} />
                      Saved for later
                    </Box>
                  </LinkUi>
                </Link>
              </Breadcrumbs>
              <Typography
                onClick={() => {
                  setUserSignInOnClick({});
                  setSettingsAuthOnError(false);
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
                />
              </Box>
              <Button color="primary" variant="contained" disableElevation onClick={() => { resetEmail(email); }}>
                Update
              </Button>
            </Box>

            <Box mx={5} mb={5}>
              <Card>
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
              <Card>
                <CardContent>
                  <Typography align="center" variant="h2">Want to delete your account?</Typography>
                  <Typography align="center">Account deletion is final. You won’t be able to restore your account or recuperate your saved items if you delete your account.</Typography>
                  <Typography align="center">In order to comply with local and international regulations, it may take up to two weeks for your account to be entirely removed from our systems.</Typography>
                </CardContent>
                <CardActions>
                  <Box display="flex" flexDirection="column" width={1} mb={5} px={5}>
                    <LinkUi component="a" variant="h2" align="center" href={`mailto:team@ysm.io?subject=Request Account Deletion&body=Request Deletion for ${user.name} (Email: ${user.email})`}>
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
  user: PropTypes.objectOf(PropTypes.string),
};

Settings.defaultProps = {
  settingsAuth: false,
  user: {},
};

const mapStateToProps = (state) => ({
  user: state.user,
  settingsAuth: state.user.settingsAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setSettingsAuthOnError: (bool) => dispatch(setSettingsAuth(bool)),
  setUserSignInOnClick: (user) => dispatch(setUserSignIn(user)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
