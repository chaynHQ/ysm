import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import * as firebase from 'firebase-admin';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { FIREBASE } from './../src/firebase/firebase-factory';
import { FirebaseAuth, FirebaseServices } from './../src/firebase/firebase.types';

async function generateIdToken(auth: FirebaseAuth, uid: string): Promise<string> {
  const firebaseWebApiKey = process.env.FIREBASE_WEB_API_KEY;

  if (!firebaseWebApiKey) {
    throw new Error(
      `Missing FIREBASE_WEB_API_KEY env var for e2e tests - place this in .env.test.local`,
    );
  }

  const customToken = await firebase.auth().createCustomToken(uid, { email_verified: true });

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${firebaseWebApiKey}`;
  const result = await axios.post(url, {
    token: customToken,
    returnSecureToken: true,
  });

  return result.data.idToken as string;
}

describe('User Profile (e2e)', () => {
  let app: INestApplication;

  const userId = '1234';
  let authToken: string;

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Only set auth token once as we don't need it renewed on every test case.
    if (!authToken) {
      const firebaseAuth = app.get<FirebaseServices>(FIREBASE).auth;
      authToken = await generateIdToken(firebaseAuth, userId);
      // console.log(`authToken = ${authToken}`);
    }
  });

  describe('GET /profile', () => {
    describe('unauthenticated', () => {
      it('should be unauthorized', () => {
        return request(app.getHttpServer())
          .get('/profile')
          .expect('Content-Type', /json/)
          .expect(401, {
            statusCode: 401,
            message: 'Unauthorized: missing required Authorization token',
            error: 'Unauthorized',
          });
      });
    });

    describe('authenticated', () => {
      it("should return the authenticated user's profile", () => {
        return request(app.getHttpServer())
          .get('/profile')
          .set('Authorization', `Bearer ${authToken}`)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            favorites: [],
          });
      });
    });
  });
});
