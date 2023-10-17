// Import the functions you need from the SDKs you need
import analytics from 'firebase/compat/analytics';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { Cookies } from 'react-cookie-consent';
import isBrowser from '../shared/browserCheck';
import rollbar from '../shared/rollbar';

const CONSENT_COOKIE_NAME = 'ConsentToCookie';

function shouldEnableAnalytics() {
  // Ref: https://github.com/Mastermindzh/react-cookie-consent#why-are-there-two-cookies-one-of-which-named-legacy

  let cookieValue = Cookies.get(CONSENT_COOKIE_NAME);

  // If the cookieValue is undefined check for the legacy cookie
  if (cookieValue === undefined) {
    cookieValue = Cookies.get(`${CONSENT_COOKIE_NAME}-legacy`);
  }

  return cookieValue === 'true';
}

function disableGoogleAnalyticsAdSignals() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }
  gtag('set', 'allow_google_signals', false);
}

const config = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (isBrowser && !firebase.apps.length && analytics.isSupported()) {
  firebase.initializeApp(config);

  try {
    disableGoogleAnalyticsAdSignals();
    const analyticsInstance = firebase.analytics();
    analyticsInstance.setAnalyticsCollectionEnabled(shouldEnableAnalytics());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialise analytics', error);
    rollbar.error('Failed to initialise analytics', error);
  }
}

export default firebase;

export const uiConfig = {
  credentialHelper: 'none',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  tosUrl: '/info/terms-and-conditions',
  privacyPolicyUrl: 'https://chayn.co/privacy',
};
