import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { FirebaseServices } from './firebase.types';

export const FIREBASE = 'FIREBASE';

export const firebaseFactory = {
  provide: FIREBASE,
  useFactory: (configService: ConfigService): FirebaseServices => {
    const serviceAccount: Record<string, string> = configService.get('firebase.serviceAccount');

    const projectId = serviceAccount.project_id;
    const serviceAccountId = serviceAccount.client_email;

    let app: firebase.app.App;

    if (firebase.apps.length) {
      app = firebase.apps[0];
    } else {
      app = firebase.initializeApp({
        projectId,
        serviceAccountId,
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: `https://${projectId}.firebaseio.com`,
      });
    }

    return {
      auth: app.auth(),
      firestore: app.firestore(),
      shutdown: app.delete.bind(app),
    };
  },
  inject: [ConfigService],
};
