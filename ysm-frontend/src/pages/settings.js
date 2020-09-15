import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Box, Button, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { setSettingsAuth, fetchBookmarks } from '../store/actions';
import firebase from '../config/firebase';

const SignUpWidget = dynamic(
  () => import('../components/SignUpWidget'),
  { ssr: false },
);

const Settings = ({
  setSettingsAuthOnError, settingsAuth, fetchBookmarksOnClick, user,
}) => {
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
            <Box>
              <TextField
                id="standard-basic"
                placeholder={user.displayName}
                helperText="Display Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <Button onClick={() => { updateName(name); }}>
                Update
              </Button>
            </Box>
            <Box>
              <TextField
                id="standard-basic"
                placeholder={user.email}
                helperText="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <Button onClick={() => { resetEmail(email); }}>
                Update
              </Button>
            </Box>
            <Box>
              <TextField
                id="standard-basic"
                helperText="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <Button onClick={() => { resetPassword(password); }}>
                Update
              </Button>
            </Box>
            {/* TODO: This needs to be moved to the saved items section */}
            <Button onClick={() => { fetchBookmarksOnClick(); }}>
              Get Bookmarks
            </Button>
          </Box>
        )
        : <SignUpWidget redirectUrl="/settings" />}
    </Box>
  );
};

Settings.propTypes = {
  setSettingsAuthOnError: PropTypes.func.isRequired,
  fetchBookmarksOnClick: PropTypes.func.isRequired,
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
  fetchBookmarksOnClick: () => dispatch(fetchBookmarks()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
