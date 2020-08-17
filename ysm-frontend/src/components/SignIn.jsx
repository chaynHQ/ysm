import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase, { uiConfig } from '../config/firebase';

import { setSettingsAuth } from '../store/actions';

const SignIn = ({ redirectUrl, setSettingsAuthOnSuccess }) => {
  const location = useLocation();

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <StyledFirebaseAuth
        uiConfig={{
          ...uiConfig,
          signInSuccessUrl: redirectUrl || '/overview',
          callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
              const { user } = authResult;
              if (location.pathname === '/settings') {
                setSettingsAuthOnSuccess(true);
                return false;
              }
              if (authResult.additionalUserInfo.isNewUser || !user.emailVerified) {
                user.sendEmailVerification();
              }
              return true;
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
    </Box>
  );
};

SignIn.propTypes = {
  redirectUrl: PropTypes.string,
  setSettingsAuthOnSuccess: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  redirectUrl: '',
};

const mapDispatchToProps = (dispatch) => ({
  setSettingsAuthOnSuccess: (bool) => dispatch(setSettingsAuth(bool)),
});

export default connect(null, mapDispatchToProps)(SignIn);
