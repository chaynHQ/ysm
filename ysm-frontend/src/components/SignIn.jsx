import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import firebase, {uiConfig} from '../config/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useLocation, useHistory } from 'react-router-dom'

import { setSettingsAuth } from '../store/actions';

const SignIn = (props) => {

  let location = useLocation()

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <StyledFirebaseAuth
        uiConfig={{
          ...uiConfig, 
          signInSuccessUrl: props.redirectUrl ? props.redirectUrl : '/overview',
          callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
              const { user } = authResult;
              if(location.pathname === '/settings') {
                props.setSettingsAuth(true)
                return false
              }
              if (authResult.additionalUserInfo.isNewUser || !user.emailVerified) {
                user.sendEmailVerification();
              }
              return true;
            }
          }
          }} 
        firebaseAuth={firebase.auth()}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  setSettingsAuth: (bool) => dispatch(setSettingsAuth(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
