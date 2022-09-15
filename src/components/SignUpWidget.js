import {
  Avatar, Box, Button, makeStyles, Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect } from 'react-redux';
import { axiosGet, axiosPut } from '../shared/axios';
import isBrowser from '../shared/browserCheck';
import rollbar from '../shared/rollbar';
import { setBookmark, setSettingsAuth } from '../store/actions';
import NewsletterSignup from './NewsletterSignup';

const uiConfig = {
  credentialHelper: 'none',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '/info/terms-and-conditions',
  // Privacy policy url/callback.
  privacyPolicyUrl() {
    window.location.assign('https://chayn.co/privacy');
  },
};

const useStyles = makeStyles({
  icon: {
    width: '100%',
    height: 'auto',
  },
  image: {
    width: '65%',
  },
});

const SignUpWidget = ({
  redirectUrl, setSettingsAuthOnSuccess, setBookmarkOnSignIn,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [showTermsStep, setShowTermsStep] = useState(false);
  const [showNewsletterStep, setShowNewsletterStep] = useState(false);
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

  const actionCodeSettings = {
    url: isBrowser ? window.location.href : null,
  };

  useEffect(() => {
    // Initialize the FirebaseUI Widget using Firebase.
    const UI = new firebaseui.auth.AuthUI(firebase.auth);
    // The start method will wait until the DOM is loaded.

    try {
      UI.start('#firebaseui-auth-container', {
        ...uiConfig,
        callbacks: {
          signInFailure(error) {
            handleError(error);
          },
          signInSuccessWithAuthResult: (authResult) => {
            // This cannot be async & must return false for proper redirection

            const signedInUser = authResult.user;

            // Analytics
            if (authResult.additionalUserInfo.isNewUser) {
              firebase.analytics().logEvent('sign_up');
            } else {
              firebase.analytics().logEvent('login');
            }

            const successResponse = async () => {
              const idToken = await signedInUser.getIdToken();
              const profile = await axiosGet('/profile',
                {
                  headers: {
                    authorization: `Bearer ${idToken}`,
                  },
                });

              if (profile.termsAccepted) {
                profile.bookmarkedResources.forEach((bookmarkSlug) => {
                  setBookmarkOnSignIn(bookmarkSlug);
                });
                if (router.pathname === '/settings') {
                  setSettingsAuthOnSuccess(true);
                } else {
                  router.push(redirectUrl || '/');
                }
              } if (!profile.termsAccepted) {
                setShowTermsStep(true);
                setShowVerificationStep(false);
              }
            };

            const signOut = async () => {
              await firebase.auth().signOut();
            };

            if (authResult.additionalUserInfo.isNewUser || !signedInUser.emailVerified) {
              signedInUser.sendEmailVerification(actionCodeSettings);
              setShowVerificationStep(true);
              setShowTermsStep(false);
              signOut();
            } else if (signedInUser.emailVerified) {
              successResponse();
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
      const idToken = await u.getIdToken();
      const profile = await axiosGet('/profile',
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        });
      return profile.termsAccepted;
    };
    if (user) {
      if (!user.emailVerified) {
        user.sendEmailVerification(actionCodeSettings);
        firebase.auth().signOut();
        setShowVerificationStep(true);
        setShowTermsStep(false);
      } else if (user.emailVerified) {
        checkTermsAcceptance(user).then(
          (termsAccepted) => {
            if (!termsAccepted) {
              setShowVerificationStep(false);
              setShowTermsStep(true);
            } else if (router.pathname !== '/settings') {
              router.push(redirectUrl || '/');
            }
          },
        );
      }
    }
  }, []);

  return (
    <Box
      py={3}
      px={5}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box pb={2} width="30%" display="flex" justifyContent="center">
          <Avatar
            variant="square"
            className={classes.icon}
            src="/logo.png"
            alt="YSM Logo"
          />
        </Box>

        {showErrorText ? (
          <Box boxShadow={1} mt={5} p={5} py={4} bgcolor="primary.main" display="flex" alignItems="center">
            <Typography variant="h2" align="center" color="secondary">{errorText}</Typography>
          </Box>
        ) : null}

        {!showTermsStep && !showVerificationStep
          ? (
            <>
              <Typography color="textSecondary">
                If you are signing up for the first time, you can give us any name like
                &quot;New Sunshine&quot;
              </Typography>
              <Typography color="textSecondary">And if you’re signing in, welcome back friend!</Typography>

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
                src="/two-people-illustration.png"
                alt="Line drawing of two people sat down having a conversation."
              />
              <Typography color="textSecondary">Thanks for signing up!</Typography>
              <Typography color="textSecondary"><b>We&apos;ve sent you an email to verify your account.</b></Typography>
              <Typography color="textSecondary"><b>Please check your email.</b></Typography>
            </Box>
          ) : null}

        { showTermsStep && !showVerificationStep
          ? (
            <>
              <Box className="mdl-card mdl-shadow--2dp firebaseui-container">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const idToken = await user.getIdToken();
                    await axiosPut('/profile/terms/accept', null, {
                      headers: {
                        authorization: `Bearer ${idToken}`,
                      },
                    });
                    setShowNewsletterStep(true);
                    setShowTermsStep(false);
                  // router.push(redirectUrl || '/');
                  }}
                >
                  <Box>
                    <Box className="firebaseui-card-header">
                      <h1 className="firebaseui-title">
                        Notifications and Privacy Policy
                      </h1>
                    </Box>
                    <Box className="firebaseui-card-content">
                      <Box className="firebaseui-relative-wrapper">
                        <Box className="mdl-card__supporting-text">
                          We care about your privacy! We will securely store the
                          information you have provided to us (name, email and IP address)
                          for a minimum of 9 months. If you want
                          us to remove this information, we will delete it. Your
                          information might be shared with other apps such as analytics to
                          see who is using YSM, this helps us improve it.
                          Detailed info can be found in our
                          <a href="https://chayn.co/privacy" rel="noreferrer" target="_blank">Privacy Policy</a>
                          .
                        </Box>

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
                            <a href="https://chayn.co/privacy" rel="noreferrer" target="_blank">Privacy Policy</a>
                            {' '}
                            and
                            {' '}
                            <a href="info/terms-and-conditions" rel="noreferrer" target="_blank">Terms of Service</a>
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

                        const idToken = await user.getIdToken();
                        await axiosPut('/profile/terms/unaccept', null, {
                          headers: {
                            authorization: `Bearer ${idToken}`,
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

        {showNewsletterStep
          ? (
            <>
              <NewsletterSignup />
              <Link href={redirectUrl || '/'} passHref>
                <LinkUi component="a" color="inherit">
                  Skip this step
                </LinkUi>

              </Link>
            </>
          )
          : null}
      </Box>
    </Box>
  );
};

SignUpWidget.propTypes = {
  redirectUrl: PropTypes.string,
  setSettingsAuthOnSuccess: PropTypes.func.isRequired,
  setBookmarkOnSignIn: PropTypes.func.isRequired,
};

SignUpWidget.defaultProps = {
  redirectUrl: '',
};

const mapDispatchToProps = (dispatch) => ({
  setSettingsAuthOnSuccess: (bool) => dispatch(setSettingsAuth(bool)),
  setBookmarkOnSignIn: (slug) => dispatch(setBookmark(slug)),
});

export default connect(null, mapDispatchToProps)(SignUpWidget);
