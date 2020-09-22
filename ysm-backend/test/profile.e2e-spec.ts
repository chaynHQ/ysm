import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { FIREBASE } from './../src/firebase/firebase-factory';
import { FirebaseServices, Firestore } from './../src/firebase/firebase.types';
import { authUser } from './util/auth-user';
import { deleteUser } from './util/delete-user';
import { generateIdToken } from './util/generate-id-token';

// IMPORTANT – this e2e…
// - Generates and uses a real Firebase Auth token.
// – Persists and cleans up data in Firestore.
// The Firebase project it will talk to is defined by credentials set in the test environment
// (see the README for more details).

async function cleanupProfileDoc(firestore: Firestore, uid: string) {
  return firestore.doc(`profiles/${uid}`).delete();
}

describe('User Profile (e2e)', () => {
  let app: INestApplication;

  let firebaseServices: FirebaseServices;
  let authToken: string;

  afterAll(async () => {
    await deleteUser(firebaseServices.auth, authUser.uid);

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
      authToken = await generateIdToken(firebaseServices.auth, authUser.uid, authUser.email);
    }
  });

  beforeEach(async () => {
    await cleanupProfileDoc(firebaseServices.firestore, authUser.uid);
  });

  afterAll(async () => {
    await cleanupProfileDoc(firebaseServices.firestore, authUser.uid);
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

    describe('PUT /profile/terms/accept', () => {
      it('should be unauthorized', () => {
        return request(app.getHttpServer())
          .put(`/profile/terms/accept`)
          .expect('Content-Type', /json/)
          .expect(401, {
            statusCode: 401,
            message: 'Unauthorized: missing required Authorization token',
            error: 'Unauthorized',
          });
      });
    });

    describe('PUT /profile/terms/unaccept', () => {
      it('should be unauthorized', () => {
        return request(app.getHttpServer())
          .put(`/profile/terms/unaccept`)
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
            id: authUser.uid,
            termsAccepted: false,
            bookmarkedResources: [],
            resourceState: {},
          });
      });
    });

    describe('accepting and unaccepting terms', () => {
      it('should update the profile accordingly', async () => {
        const server = app.getHttpServer();
        const authHeader = `Bearer ${authToken}`;

        // Accept terms
        await request(server)
          .put('/profile/terms/accept')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: authUser.uid,
            termsAccepted: true,
            bookmarkedResources: [],
            resourceState: {},
          });

        // Should be idempotent
        await request(server)
          .put('/profile/terms/accept')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: authUser.uid,
            termsAccepted: true,
            bookmarkedResources: [],
            resourceState: {},
          });

        // Unaccept terms
        await request(server)
          .put('/profile/terms/unaccept')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
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
            id: authUser.uid,
            termsAccepted: false,
            bookmarkedResources: [],
            resourceState: {
              '12345': { aa: 1 },
              '67890': {},
            },
          });
      });
    });

    describe('multiple different updates to the profile', () => {
      it('should update the profile accordingly', async () => {
        const server = app.getHttpServer();
        const authHeader = `Bearer ${authToken}`;

        // Accept terms
        await request(server)
          .put('/profile/terms/accept')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: authUser.uid,
            termsAccepted: true,
            bookmarkedResources: [],
            resourceState: {},
          });

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
            id: authUser.uid,
            termsAccepted: true,
            bookmarkedResources: ['12345'],
            resourceState: {},
          });

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
            id: authUser.uid,
            termsAccepted: true,
            bookmarkedResources: ['12345'],
            resourceState: {
              '12345': { a: 1 },
            },
          });

        // Remove the bookmark
        await request(server)
          .delete('/profile/bookmarks/resources/12345')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: authUser.uid,
            termsAccepted: true,
            bookmarkedResources: [],
            resourceState: {
              '12345': { a: 1 },
            },
          });

        // Set state to empty object
        await request(server)
          .put('/profile/state/resources/12345')
          .send({})
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: authUser.uid,
            termsAccepted: true,
            bookmarkedResources: [],
            resourceState: {
              '12345': {},
            },
          });

        // Unaccept terms
        await request(server)
          .put('/profile/terms/unaccept')
          .set('Authorization', authHeader)
          .expect(204);
        await request(server)
          .get('/profile')
          .set('Authorization', authHeader)
          .expect('Content-Type', /json/)
          .expect(200, {
            id: authUser.uid,
            termsAccepted: false,
            bookmarkedResources: [],
            resourceState: {
              '12345': {},
            },
          });
      });
    });
  });
});
