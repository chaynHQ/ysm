import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { nanoid } from 'nanoid';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { FIREBASE } from './../src/firebase/firebase-factory';
import {
  firebase,
  FirebaseAuth,
  FirebaseServices,
  Firestore,
} from './../src/firebase/firebase.types';

// IMPORTANT – this e2e…
// - Generates and uses a real Firebase Auth token.
// – Persists and cleans up data in Firestore.
// The Firebase project it will talk to is defined by credentials set in the test environment
// (see the README for more details).

async function generateIdToken(auth: FirebaseAuth, userId: string): Promise<string> {
  const firebaseWebApiKey = process.env.FIREBASE_WEB_API_KEY;

  if (!firebaseWebApiKey) {
    throw new Error(
      `Missing FIREBASE_WEB_API_KEY env var for e2e tests - place this in .env.test.local`,
    );
  }

  const customToken = await firebase.auth().createCustomToken(userId, { email_verified: true });

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${firebaseWebApiKey}`;
  const result = await axios.post(url, {
    token: customToken,
    returnSecureToken: true,
  });

  return result.data.idToken as string;
}

async function cleanupProfileDoc(firestore: Firestore, userId: string) {
  return firestore.doc(`profiles/${userId}`).delete();
}

describe('User Profile (e2e)', () => {
  let app: INestApplication;
  let firebaseServices: FirebaseServices;

  const userId = `e2e-test-${nanoid(8)}`;
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

    firebaseServices = app.get<FirebaseServices>(FIREBASE);

    // Only set auth token once as we don't need it renewed on every test case.
    if (!authToken) {
      authToken = await generateIdToken(firebaseServices.auth, userId);
      // console.log(`authToken = ${authToken}`);
    }
  });

  beforeEach(async () => {
    await cleanupProfileDoc(firebaseServices.firestore, userId);
  });

  afterAll(async () => {
    await cleanupProfileDoc(firebaseServices.firestore, userId);
  });

  describe('unauthenticated', () => {
    describe('GET /profile', () => {
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

    describe('PUT /profile/bookmarks/resources/:resourceId', () => {
      it('should be unauthorized', () => {
        return request(app.getHttpServer())
          .put(`/profile/bookmarks/resources/12345`)
          .expect('Content-Type', /json/)
          .expect(401, {
            statusCode: 401,
            message: 'Unauthorized: missing required Authorization token',
            error: 'Unauthorized',
          });
      });
    });

    describe('DELETE /profile/bookmarks/resources/:resourceId', () => {
      it('should be unauthorized', () => {
        return request(app.getHttpServer())
          .delete(`/profile/bookmarks/resources/12345`)
          .expect('Content-Type', /json/)
          .expect(401, {
            statusCode: 401,
            message: 'Unauthorized: missing required Authorization token',
            error: 'Unauthorized',
          });
      });
    });

    describe('PUT /profile/state/resources/:resourceId', () => {
      it('should be unauthorized', () => {
        return request(app.getHttpServer())
          .put(`/profile/state/resources/12345`)
          .expect('Content-Type', /json/)
          .expect(401, {
            statusCode: 401,
            message: 'Unauthorized: missing required Authorization token',
            error: 'Unauthorized',
          });
      });
    });
  });

  describe('authenticated', () => {
    describe('GET /profile', () => {
      it("should return the authenticated user's profile", () => {
        return request(app.getHttpServer())
          .get('/profile')
          .set('Authorization', `Bearer ${authToken}`)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: [],
            resourceState: {},
          });
      });
    });

    describe('adding and removing bookmarks', () => {
      it('should update the profile accordingly', async () => {
        const server = app.getHttpServer();
        const authHeader = `Bearer ${authToken}`;

        // Add a bookmark
        await request(server)
          .put('/profile/bookmarks/resources/12345')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: ['12345'],
            resourceState: {},
          });

        // Add another bookmark
        await request(server)
          .put('/profile/bookmarks/resources/67890')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: ['12345', '67890'],
            resourceState: {},
          });

        // Addition should be idempotent
        await request(server)
          .put('/profile/bookmarks/resources/12345')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: ['12345', '67890'],
            resourceState: {},
          });

        // Remove one of the bookmarks
        await request(server)
          .delete('/profile/bookmarks/resources/12345')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: ['67890'],
            resourceState: {},
          });

        // Removal should be idempotent
        await request(server)
          .delete('/profile/bookmarks/resources/12345')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: ['67890'],
            resourceState: {},
          });
      });
    });

    describe('updating resource state', () => {
      it('should update the profile accordingly', async () => {
        const server = app.getHttpServer();
        const authHeader = `Bearer ${authToken}`;

        // Update state for a resource
        await request(server)
          .put('/profile/state/resources/12345')
          .send({ a: 1 })
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: [],
            resourceState: {
              '12345': { a: 1 },
            },
          });

        // Update state for another resource
        await request(server)
          .put('/profile/state/resources/67890')
          .send({ b: 1 })
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: [],
            resourceState: {
              '12345': { a: 1 },
              '67890': { b: 1 },
            },
          });

        // Updates are idempotent
        await request(server)
          .put('/profile/state/resources/12345')
          .send({ a: 1 })
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: [],
            resourceState: {
              '12345': { a: 1 },
              '67890': { b: 1 },
            },
          });

        // Update state again for the first resource
        await request(server)
          .put('/profile/state/resources/12345')
          .send({ a: 2 })
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: [],
            resourceState: {
              '12345': { a: 2 },
              '67890': { b: 1 },
            },
          });

        // Set state to empty object
        await request(server)
          .put('/profile/state/resources/67890')
          .send({})
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: [],
            resourceState: {
              '12345': { a: 2 },
              '67890': {},
            },
          });

        // Make sure old fields within resource state are removed
        await request(server)
          .put('/profile/state/resources/12345')
          .send({ aa: 1 })
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: userId,
            bookmarkedResources: [],
            resourceState: {
              '12345': { aa: 1 },
              '67890': {},
            },
          });
      });
    });
  });
});
