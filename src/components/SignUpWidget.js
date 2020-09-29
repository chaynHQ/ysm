import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Box, Typography, makeStyles, Button,
} from '@material-ui/core';

import * as firebaseui from 'firebaseui';
import firebase, { uiConfig } from '../config/firebase';

import { setSettingsAuth, setUserSignIn } from '../store/actions';

import { axiosPut, axiosGet } from '../store/axios';

const useStyles = makeStyles({
  icon: {
    width: 60,
    height: 60,
  },
  image: {
    width: '65%',
  },
});

const SignUpWidget = ({
  redirectUrl, setSettingsAuthOnSuccess, setUserSignInOnSuccess, user,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [showTermsStep, setShowTermsStep] = useState(false);

  // TODO: Put in background iamge

  useEffect(() => {
    if (Object.keys(user).length < 1) {
    // Initialize the FirebaseUI Widget using Firebase.
      const FirebaseAuth = firebaseui.auth.AuthUI;
      const UI = FirebaseAuth.getInstance() || new FirebaseAuth(firebase.auth());
      // The start method will wait until the DOM is loaded.
      UI.start('#firebaseui-auth-container', {
        ...uiConfig,
        callbacks: {
          signInSuccessWithAuthResult: async (authResult) => {
            const signedInUser = authResult.user;
            setUserSignInOnSuccess(signedInUser);

            if (authResult.additionalUserInfo.isNewUser || !signedInUser.emailVerified) {
              signedInUser.sendEmailVerification();
              setShowVerificationStep(true);
              setShowTermsStep(false);
              setUserSignInOnSuccess({});
            } else if (signedInUser.emailVerified) {
              const serverUser = await axiosGet('/profile',
                {
                  headers: {
                    authorization: `Bearer ${signedInUser.xa}`,
                  },
                });

              if (serverUser.termsAccepted) {
                if (router.pathname === '/settings') {
                  setSettingsAuthOnSuccess(true);
                } else {
                  router.push(redirectUrl || '/');
                }
              } if (!serverUser.termsAccepted) {
                setShowTermsStep(true);
                setShowVerificationStep(false);
                setUserSignInOnSuccess({});
              }
            }
            return false;
          },
        },
      });
    }
  }, []);

  let signUpStage;

  if (showTermsStep) {
    signUpStage = (
      <>
        <Box className="mdl-card mdl-shadow--2dp firebaseui-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axiosPut('/profile/terms/accept', { currentUserId: user.xa }, {
                headers: {
                  authorization: `Bearer ${user.xa}`,
                },
              });
            }}
          >
            <Box className="firebaseui-card-header">
              <h1 className="firebaseui-title">
                Notifications and Privacy Policy
              </h1>
            </Box>
            <Box className="firebaseui-card-content">
              <Box className="firebaseui-relative-wrapper">
                <Box className="mdl-card__supporting-text">
                  We care about your privacy! We will securely store the
                  information you have provided to us (name, email, language,
                  timezone and IP address) for a minimum of 9 months. If you want
                  us to remove this information, we will delete it. Your
                  information might be shared with other apps such as analytics to
                  see who is using Soul Medicine, this helps us improve it.
                  Detailed info can be found in our
                  {/* TODO: FIX THIS URL */}
                  <a href="privacyPolicyUrl" target="_blank">Privacy Policy</a>
                  .
                </Box>
                <Box className="mdl-card__supporting-text">
                  We will be emailing you about important system updates and you
                  can choose when else you want to hear from us.
                </Box>
                <ul className="mdl-list">
                  <li className="mdl-list__item">
                    Announcements about Soul Medicine
                  </li>
                  <li className="mdl-list__item">
                    Updates about new courses
                  </li>
                  <li className="mdl-list__item">
                    Updates on existing courses
                  </li>
                </ul>

                <label
                  className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"
                  htmlFor="acceptCheckBox"
                >
                  <input
                    id="acceptCheckBox"
                    type="checkbox"
                    className="mdl-checkbox__input"
                    required
                  />
                  <span className="mdl-checkbox__label">
                    I have read and agree to the
                    {/* // TODO: FIX THESE URLS */}
                    <a href="privacyPolicyUrl" target="_blank">Privacy Policy</a>
                    and
                    {' '}
                    <a href="tosUrl" target="_blank">Terms of Service</a>
                  </span>
                </label>
              </Box>
            </Box>
            <Box className="firebaseui-card-actions">
              <Box className="firebaseui-form-actions">
                <button
                  id="acceptButton"
                  type="submit"
                  className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                  data-upgraded=",MaterialButton"
                >
                  Accept and sign in
                </button>
              </Box>
            </Box>
          </form>
        </Box>

        <Box my={3}>
          <Typography variant="h1">
            OR
          </Typography>
        </Box>

        <Box className="mdl-card mdl-shadow--2dp firebaseui-container">
          <Box className="firebaseui-card-header">
            <h1 className="firebaseui-title">
              Reject and don&apos;t proceed
            </h1>
          </Box>
          <Box className="firebaseui-card-content">
            <Box className="firebaseui-relative-wrapper">
              <Box className="mdl-card__supporting-text">
                You can choose to not proceed and reject the Privacy Policy and
                Terms of Service.
                <br />
                <br />
                Clicking on the button below will sign you out.
              </Box>
            </Box>
          </Box>
          <Box className="firebaseui-card-actions">
            <Box className="firebaseui-form-actions">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  axiosPut('/profile/terms/unaccept', { currentUserId: user.xa }, {
                    headers: {
                      authorization: `Bearer ${user.xa}`,
                    },

                  });
                }}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              >
                Reject
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    );
  } else if (showVerificationStep) {
    signUpStage = (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <img
          className={classes.image}
          src="/homepage-illustration.png"
          alt="Line drawing of two people sat down having a conversation."
        />
        <Typography>Thanks for signing up!</Typography>
        <Typography><b>We&apos;ve sent you an email to verify your account.</b></Typography>
        <Typography><b>Please check your email.</b></Typography>
      </Box>
    );
  } else if (Object.keys(user).length < 1) {
    signUpStage = (
      <>
        <Typography>
          If you are signing up for the first time, you can give us any name like
          &quot;New Sunshine&quot;
        </Typography>
        <Typography>And if you’re signing in, welcome back queen!</Typography>

        {/* TODO: NEED TO ADD PRIVACY POLICY & T&C's Link */}
        <Box id="firebaseui-auth-container" />
      </>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      py={5}
      px={5}
      alignItems="center"
    >
      <img
        className={classes.icon}
        src="/logo.png"
        alt="YSM Logo"
      />
      {signUpStage}
    </Box>
  );
};

SignUpWidget.propTypes = {
  redirectUrl: PropTypes.string,
  setSettingsAuthOnSuccess: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  setUserSignInOnSuccess: PropTypes.func.isRequired,
};

SignUpWidget.defaultProps = {
  redirectUrl: '',
  user: {},
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setSettingsAuthOnSuccess: (bool) => dispatch(setSettingsAuth(bool)),
  setUserSignInOnSuccess: (user) => dispatch(setUserSignIn(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpWidget);