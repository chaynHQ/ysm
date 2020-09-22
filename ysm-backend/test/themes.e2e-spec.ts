import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';
import { nanoid } from 'nanoid';
import StoryblokClient, { StoriesParams } from 'storyblok-js-client';
import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { FIREBASE } from '../src/firebase/firebase-factory';
import { FirebaseServices } from '../src/firebase/firebase.types';
import { AppModule } from './../src/app.module';
import { storyblokThemesListFixture } from './fixtures/storyblok';
import { themesListFixture } from './fixtures/themes';
import { generateIdToken } from './util/generate-id-token';
import { mockConfigService } from './util/mock-config-service';

jest.mock('storyblok-js-client');
const mockedStoryblokClient = mocked(StoryblokClient, true);

function mockGetStories(instance: StoryblokClient, data: any, previewMode = false): void {
  const params: StoriesParams = {
    starts_with: 'themes/',
    version: previewMode ? 'draft' : 'published',
  };

  when(mocked(instance.getStories))
    .expectCalledWith(params)
    .mockResolvedValueOnce({ data, perPage: 0, total: 0, headers: null });
}

describe('Themes (e2e)', () => {
  let app: INestApplication;

  let firebaseServices: FirebaseServices;
  const userId = `e2e-themes-${nanoid(8)}`;
  const userEmail = 'test@example.org';
  let authToken: string;

  let configService: ConfigService;

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    mockedStoryblokClient.mockClear();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    configService = app.get<ConfigService>(ConfigService);
    mockConfigService(configService, 'contentEditorEmails', []);

    firebaseServices = app.get<FirebaseServices>(FIREBASE);

    // Only set auth token once as we don't need it renewed on every test case.
    if (!authToken) {
      authToken = await generateIdToken(firebaseServices.auth, userId, userEmail);
      // console.log(`authToken = ${authToken}`);
    }
  });

  describe('GET /themes', () => {
    describe('when no themes exist on Storyblok', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mockGetStories(mockedStoryblokClientInstance, { stories: [] });
      });

      it('should return an empty list', () => {
        return request(app.getHttpServer())
          .get('/themes')
          .expect('Content-Type', /json/)
          .expect(200, []);
      });
    });

    describe('when themes do exist on Storyblok and we want all of them', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mockGetStories(mockedStoryblokClientInstance, storyblokThemesListFixture);
      });

      it('should return the whole list of themes', () => {
        return request(app.getHttpServer())
          .get('/themes')
          .expect('Content-Type', /json/)
          .expect(200, themesListFixture);
      });
    });

    describe('preview mode', () => {
      describe('without any auth', () => {
        it('should return 403 Forbidden', async () => {
          // Precondition:
          expect(configService.get<string[]>('contentEditorEmails')).toEqual([]);

          await request(app.getHttpServer())
            .get('/resources')
            .set('X-PREVIEW-MODE', 'true')
            .expect('Content-Type', /json/)
            .expect(403);

          expect(mockedStoryblokClient.mock.instances[0].getStories).not.toHaveBeenCalled();
        });
      });

      describe('with allowed auth', () => {
        beforeEach(() => {
          mockConfigService(configService, 'contentEditorEmails', [userEmail]);

          const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

          mockGetStories(mockedStoryblokClientInstance, storyblokThemesListFixture, true);
        });

        it('should return the draft list of resources', () => {
          // Precondition:
          expect(configService.get<string[]>('contentEditorEmails')).toEqual([userEmail]);

          return request(app.getHttpServer())
            .get('/themes')
            .set('Authorization', `Bearer ${authToken}`)
            .set('X-PREVIEW-MODE', 'true')
            .expect('Content-Type', /json/)
            .expect(200, themesListFixture);
        });
      });
    });
  });
});
