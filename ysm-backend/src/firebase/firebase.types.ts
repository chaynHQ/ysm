import * as firebase from 'firebase-admin';

export type FirebaseAuth = firebase.auth.Auth;
export type DecodedIdToken = firebase.auth.DecodedIdToken;

export type Firestore = firebase.firestore.Firestore;

export interface FirebaseServices {
  auth: FirebaseAuth;
  firestore: Firestore;
  shutdown: () => Promise<void>;
}
