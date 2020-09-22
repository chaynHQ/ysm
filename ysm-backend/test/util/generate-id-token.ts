import axios from 'axios';
import { FirebaseAuth } from '../../src/firebase/firebase.types';

export async function generateIdToken(
  auth: FirebaseAuth,
  uid: string,
  email: string,
): Promise<string> {
  const firebaseWebApiKey = process.env.FIREBASE_WEB_API_KEY;

  if (!firebaseWebApiKey) {
    throw new Error(
      `Missing FIREBASE_WEB_API_KEY env var for e2e tests - place this in .env.test.local`,
    );
  }

  const customToken = await auth.createCustomToken(uid, { email, email_verified: true });

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${firebaseWebApiKey}`;
  const result = await axios.post(url, {
    token: customToken,
    returnSecureToken: true,
  });

  return result.data.idToken as string;
}
