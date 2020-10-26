import {
  Box, Button, makeStyles, Typography,
} from '@material-ui/core';
import * as firebaseui from 'firebaseui';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect } from 'react-redux';
import firebase, { uiConfig } from '../config/firebase';
import rollbar from '../shared/rollbar';
import { setSettingsAuth } from '../store/actions';
import { axiosGet, axiosPut } from '../store/axios';

const useStyles = makeStyles({
  icon: {
    width: 60,
    height: 60,
  },
  image: {
    width: '65%',
  },
});

const isBrowser = typeof window !== 'undefined';

const SignUpWidget = ({
  redirectUrl, setSettingsAuthOnSuccess,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [showTermsStep, setShowTermsStep] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleError = (error) => {
    setShowVerificationStep(false);
    setShowTermsStep(false);
    setShowErrorText(true);
    switch (error.code) {
      case 'auth/unsupported-persistence-type':
        setErrorText('There may be a problem with your cookies or storage that is stopping us from signing you in. Please check your settings.');
        break;
      case 'auth/network-request-failed':
        setErrorText('It looks like there is an issue with your network or connection that is preventing us from signing you in. Please check your settings.');
        break;
      case 'auth/too-many-requests':
        setErrorText('It looks like there have been a lot of sign in attempts from this computer in the past hour so we are blocking any more attempts for security reasons. Please try again later.');
        break;
      case 'auth/user-disabled':
        setErrorText('The account associated with this email address has been disabled. Please contact us through our about page if you are not sure why.');
        break;
      case 'server/signin':
        setErrorText("Sorry, something went wrong when signing you in! We've been notified about this. Please try again later on.");
        rollbar.error('Server-side sign in error', error);
        break;
      default:
        setErrorText("Sorry, something went wrong when signing you in! We've been notified about this. Please try again later on.");
        rollbar.error('Client-side sign in error', error);
    }
  };

  // TODO: Put in background image

  useEffect(() => {
    const FirebaseAuth = firebaseui.auth.AuthUI;
    const UI = FirebaseAuth.getInstance() || new FirebaseAuth(firebase.auth());

    try {
      UI.start('#firebaseui-auth-container', {
        ...uiConfig,
        callbacks: {
          signInFailure(error) {
            handleError(error);
          },
          signInSuccessWithAuthResult: async (authResult) => {
            const signedInUser = authResult.user;

            if (authResult.additionalUserInfo.isNewUser || !signedInUser.emailVerified) {
              signedInUser.sendEmailVerification();
              setShowVerificationStep(true);
              setShowTermsStep(false);
              await firebase.auth().signOut();
            } else if (signedInUser.emailVerified) {
              const profile = await axiosGet('/profile',
                {
                  headers: {
                    authorization: `Bearer ${signedInUser.xa}`,
                  },
                });
              if (profile.termsAccepted) {
                if (router.pathname === '/settings') {
                  setSettingsAuthOnSuccess(true);
                } else {
                  router.push(redirectUrl || '/');
                }
              } if (!profile.termsAccepted) {
                setShowTermsStep(true);
                setShowVerificationStep(false);
              }
            }
            return false;
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    const checkTermsAcceptance = async (u) => {
      const profile = await axiosGet('/profile',
        {
          headers: {
            authorization: `Bearer ${u.xa}`,
          },
        });
      return profile.termsAccepted;
    };
    if (user) {
      if (!user.emailVerified) {
        user.sendEmailVerification();
        firebase.auth().signOut();
        setShowVerificationStep(true);
        setShowTermsStep(false);
      } else if (user.emailVerified) {
        checkTermsAcceptance(user).then(
          (termsAccepted) => {
            if (!termsAccepted) {
              setShowVerificationStep(false);
              setShowTermsStep(true);
            } else {
              router.push(redirectUrl || '/');
            }
          },
        );
      }
    }
  }, []);

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

      {showErrorText ? (
        <Box boxShadow={1} mt={5} p={5} py={4} bgcolor="primary.dark" display="flex" alignItems="center">
          <Typography variant="h2" align="center" color="secondary">{errorText}</Typography>
        </Box>
      ) : null}

      {!showTermsStep && !showVerificationStep
        ? (
          <>
            <Typography>
              If you are signing up for the first time, you can give us any name like
              &quot;New Sunshine&quot;
            </Typography>
            <Typography>And if you’re signing in, welcome back friend!</Typography>

            {/* TODO: NEED TO ADD PRIVACY POLICY & T&C's Link */}
            <Box id="firebaseui-auth-container" display={showTermsStep || showVerificationStep ? 'none' : 'block'} />
          </>
        ) : null}

      { !showTermsStep && showVerificationStep
        ? (
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
        ) : null}

      { showTermsStep && !showVerificationStep
        ? (
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
                  router.push(redirectUrl || '/');
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
                    onClick={async (e) => {
                      e.preventDefault();

                      axiosPut('/profile/terms/unaccept', { currentUserId: user.xa }, {
                        headers: {
                          authorization: `Bearer ${user.xa}`,
                        },

                      });
                      await firebase.auth().signOut();

                      router.push(redirectUrl || '/');
                    }}
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        ) : null }
    </Box>
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
