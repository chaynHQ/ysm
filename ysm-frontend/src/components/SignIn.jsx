import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import firebase, {uiConfig} from '../config/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';

import { setUserSignIn } from '../store/actions';

const SignIn = (props) => {

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <StyledFirebaseAuth
        uiConfig={{...uiConfig, signInSuccessUrl: props.location.state ? props.location.state.from + '?auth=true': '/overview'}} 
        firebaseAuth={firebase.auth()}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setUserSignIn: () => dispatch(setUserSignIn),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
