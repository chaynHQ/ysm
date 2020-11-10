import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

import rollbar from '../shared/rollbar';

const config = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(config);

  try {
    firebase.analytics();
  } catch (error) {
    rollbar.error('Failed to initialise analytics', error);
  }
}

export default firebase;

export const uiConfig = {
  credentialHelper: 'none',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};
