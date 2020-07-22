import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { FirebaseServices } from './firebase.types';

export const FIREBASE = 'FIREBASE';

export const firebaseFactory = {
  provide: FIREBASE,
  useFactory: (configService: ConfigService): FirebaseServices => {
    const projectId: string = configService.get('firebase.projectId');
    let app: firebase.app.App;

    if (firebase.apps.length) {
      app = firebase.apps[0];
    } else {
      app = firebase.initializeApp({
        projectId,
        credential: firebase.credential.applicationDefault(),
        databaseURL: `https://${projectId}.firebaseio.com`,
      });
    }

    return {
      auth: app.auth(),
      firestore: app.firestore(),
    };
  },
  inject: [ConfigService],
};
