import * as firebase from 'firebase-admin';

export import firebase = firebase;
export import FirebaseAuth = firebase.auth.Auth;
export import Firestore = firebase.firestore.Firestore;

export interface FirebaseServices {
  auth: FirebaseAuth;
  firestore: Firestore;
  shutdown: () => Promise<void>;
}
