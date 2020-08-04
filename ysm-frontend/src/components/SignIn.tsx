import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';

import { setUserSignIn } from '../store/actions';

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
};

firebase.initializeApp(config);

const SignIn = (props: any) => {
  const uiConfig = {
    credentialHelper: 'none',
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
        console.log('HERE');
        const user = authResult.user;
        if (authResult.additionalUserInfo.isNewUser || !user.emailVerified) {
          console.log('SENDING');
          user.sendEmailVerification();
        }
        return true;
      },
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => props.setUserSignIn(!!user));
  });

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setUserSignIn: () => dispatch(setUserSignIn),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
