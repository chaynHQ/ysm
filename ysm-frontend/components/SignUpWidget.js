import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as firebaseui from 'firebaseui';
import firebase, { uiConfig } from '../config/firebase';

const SignUpWidget = ({ redirectUrl, setSettingsAuthOnSuccess }) => {
  useEffect(() => {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', {
      ...uiConfig,
      signInSuccessUrl: redirectUrl || '/your-journey',
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          const { user } = authResult;
          // if (location.pathname === '/settings') {
          //   setSettingsAuthOnSuccess(true);
          //   return false;
          // }
          if (authResult.additionalUserInfo.isNewUser || !user.emailVerified) {
            user.sendEmailVerification();
          }
          return true;
        },
      },
    });
  });

  return (
    <div id="firebaseui-auth-container" />
  );
};

SignUpWidget.propTypes = {
  redirectUrl: PropTypes.string,
  setSettingsAuthOnSuccess: PropTypes.func.isRequired,
};

SignUpWidget.defaultProps = {
  redirectUrl: '',
};

const mapDispatchToProps = (dispatch) => ({
  setSettingsAuthOnSuccess: (bool) => dispatch(setSettingsAuth(bool)),
});

export default connect(null, mapDispatchToProps)(SignUpWidget);
