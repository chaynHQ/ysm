import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import getConfig from 'next/config';
import { Cookies } from 'react-cookie-consent';
import isBrowser from '../shared/browserCheck';
import rollbar from '../shared/rollbar';

const { publicRuntimeConfig } = getConfig();
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
  projectId: publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  apiKey: publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_DOMAIN,
  appId: publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (isBrowser && !firebase.apps.length) {
  firebase.initializeApp(config);

  try {
    disableGoogleAnalyticsAdSignals();
    const analytics = firebase.analytics();
    analytics.setAnalyticsCollectionEnabled(shouldEnableAnalytics());
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
