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
import { FilterOptions } from '../src/resources/filters.types';
import { AppModule } from './../src/app.module';
import { resourcesListFixture, singleResourceFixture } from './fixtures/resources';
import {
  storyblokDatasourceEntriesCountriesFixture,
  storyblokDatasourceEntriesLanguagesFixture,
  storyblokResourcesListFixture,
  storyblokSingleResourceDisabledFixture,
  storyblokSingleResourceFixture,
  storyblokTagsFixture,
} from './fixtures/storyblok';
import { generateIdToken } from './util/generate-id-token';
import { mockConfigService } from './util/mock-config-service';

jest.mock('storyblok-js-client');
const mockedStoryblokClient = mocked(StoryblokClient, true);

function mockGetStories(
  instance: StoryblokClient,
  data: any,
  filterQuery?: any,
  tags?: string,
  searchTerm?: string,
  previewMode = false,
): void {
  const params: StoriesParams = {
    starts_with: 'resources/',
    excluding_fields: 'content_items',
    version: previewMode ? 'draft' : 'published',
    sort_by: 'position:asc',
    per_page: 100,
  };

  params['filter_query'] = {
    ...filterQuery,
    enabled: { is: true },
  };

  if (tags) {
    params['with_tag'] = tags;
  }
  if (searchTerm) {
    params['search_term'] = searchTerm;
  }

  when(mocked(instance.getStories)).expectCalledWith(params).mockResolvedValueOnce({
    data,
    perPage: 0,
    total: 0,
    headers: null,
  });
}

function mockGetStory(
  instance: StoryblokClient,
  slug: string,
  data: any,
  previewMode?: boolean,
): void {
  when(mocked(instance.getStory))
    .expectCalledWith(`resources/${slug}`, {
      version: previewMode ? 'draft' : 'published',
    })
    .mockResolvedValueOnce({
      data,
      headers: null,
    });
}

// This is just a sanity check.
it(`the STORYBLOK_TOKEN env var should not be a valid token`, () => {
  expect(process.env.STORYBLOK_TOKEN).toBe('noop');
});

describe('Resources (e2e)', () => {
  let app: INestApplication;

  let firebaseServices: FirebaseServices;
  const userId = `e2e-resources-${nanoid(8)}`;
  const userEmail = 'test@example.org';
  let authToken: string;

  const otherEmail = 'someoneelse@example.org';

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

  // This is just a sanity check.
  it('should instantiate the StoryblokClient', () => {
    expect(mockedStoryblokClient).toHaveBeenCalledTimes(1);
  });

  describe('GET /resources/filters', () => {
    it('should return all filter options', () => {
      const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

      when(mocked(mockedStoryblokClientInstance.get))
        .expectCalledWith('cdn/tags', { version: 'draft' })
        .mockResolvedValueOnce({
          data: storyblokTagsFixture,
          perPage: 0,
          total: 0,
          headers: null,
        });

      when(mocked(mockedStoryblokClientInstance.get))
        .expectCalledWith('cdn/datasource_entries', { datasource: 'countries' })
        .mockResolvedValueOnce({
          data: storyblokDatasourceEntriesCountriesFixture,
          perPage: 0,
          total: 0,
          headers: null,
        });

      when(mocked(mockedStoryblokClientInstance.get))
        .expectCalledWith('cdn/datasource_entries', { datasource: 'languages' })
        .mockResolvedValueOnce({
          data: storyblokDatasourceEntriesLanguagesFixture,
          perPage: 0,
          total: 0,
          headers: null,
        });

      const result: FilterOptions[] = [
        { title: 'Tags', field: 'tags', options: { Health: 'Health', Timeline: 'Timeline' } },
        {
          title: 'Countries',
          field: 'countries',
          options: { GLOBAL: 'Global', GB: 'United Kingdom' },
        },
        {
          title: 'Languages',
          field: 'languages',
          options: { en: 'English', es: 'Spanish' },
        },
      ];

      return request(app.getHttpServer())
        .get('/resources/filters')
        .expect('Content-Type', /json/)
        .expect(200, result);
    });
  });

  describe('GET /resources', () => {
    describe('when no resources exist on Storyblok', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mockGetStories(mockedStoryblokClientInstance, { stories: [] });
      });

      it('should return an empty list', () => {
        return request(app.getHttpServer())
          .get('/resources')
          .expect('Content-Type', /json/)
          .expect(200, []);
      });
    });

    describe('when resources do exist on Storyblok and we want all of them', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mockGetStories(mockedStoryblokClientInstance, storyblokResourcesListFixture);
      });

      it('should return the whole list of resources', () => {
        return request(app.getHttpServer())
          .get('/resources')
          .expect('Content-Type', /json/)
          .expect(200, resourcesListFixture);
      });
    });

    describe('when resources do exist on Storyblok and we want to filter them', () => {
      beforeEach(() => {
        // NOTE: We don't test any actual filtering here – just that the expected API call is made to Storyblok via the StoryblokClient. Therefore we can just use the resources list fixture to represent the output.
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        const filters = {
          countries: { in_array: 'GB' },
        };
        const tags = 'Health';

        mockGetStories(mockedStoryblokClientInstance, storyblokResourcesListFixture, filters, tags);
      });

      it('should return the filtered list of resources', () => {
        const url = '/resources?filters[countries]=GB&filters[tags]=Health';

        return request(app.getHttpServer())
          .get(url)
          .expect('Content-Type', /json/)
          .expect(200, resourcesListFixture);
      });
    });

    describe('when resources do exist on Storyblok and we want to search for them', () => {
      beforeEach(() => {
        // NOTE: We don't test any actual searching here – just that the expected API call is made to Storyblok via the StoryblokClient. Therefore we can just use the resources list fixture to represent the output.
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mockGetStories(
          mockedStoryblokClientInstance,
          storyblokResourcesListFixture,
          undefined,
          undefined,
          'foo',
        );
      });

      it('should return the searched list of resources', () => {
        const url = '/resources?q=foo';

        return request(app.getHttpServer())
          .get(url)
          .expect('Content-Type', /json/)
          .expect(200, resourcesListFixture);
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

      describe('with auth', () => {
        describe("when authed email isn't in list of allowed emails", () => {
          beforeEach(() => {
            mockConfigService(configService, 'contentEditorEmails', [otherEmail]);
          });

          it('should return 403 Forbidden', async () => {
            // Precondition:
            expect(configService.get<string[]>('contentEditorEmails')).toEqual([otherEmail]);

            await request(app.getHttpServer())
              .get('/resources')
              .set('X-PREVIEW-MODE', 'true')
              .expect('Content-Type', /json/)
              .expect(403);

            expect(mockedStoryblokClient.mock.instances[0].getStories).not.toHaveBeenCalled();
          });
        });

        describe('when authed email is in list of allowed emails', () => {
          beforeEach(() => {
            mockConfigService(configService, 'contentEditorEmails', [userEmail]);

            // NOTE: We don't test any actual content here – just that the expected API call is made to Storyblok via the StoryblokClient. Therefore we can just use the resources list fixture to represent the output.
            const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

            mockGetStories(
              mockedStoryblokClientInstance,
              storyblokResourcesListFixture,
              undefined,
              undefined,
              undefined,
              true,
            );
          });

          it('should return the draft list of resources', () => {
            // Precondition:
            expect(configService.get<string[]>('contentEditorEmails')).toEqual([userEmail]);

            return request(app.getHttpServer())
              .get('/resources')
              .set('Authorization', `Bearer ${authToken}`)
              .set('X-PREVIEW-MODE', 'true')
              .expect('Content-Type', /json/)
              .expect(200, resourcesListFixture);
          });
        });
      });
    });
  });

  describe('GET /resources/:slug', () => {
    describe('when the resource exists and is enabled', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mockGetStory(mockedStoryblokClientInstance, 'foo', storyblokSingleResourceFixture);
      });

      it('should return the resource', () => {
        return request(app.getHttpServer())
          .get('/resources/foo')
          .expect('Content-Type', /json/)
          .expect(200, singleResourceFixture);
      });
    });

    describe('when the resource exists but is not enabled', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mockGetStory(mockedStoryblokClientInstance, 'foo', storyblokSingleResourceDisabledFixture);
      });

      it('should return a 404 Not Found', () => {
        return request(app.getHttpServer())
          .get('/resources/foo')
          .expect('Content-Type', /json/)
          .expect(404);
      });
    });

    describe('when the resource does not exist', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mocked(mockedStoryblokClientInstance.getStory).mockRejectedValueOnce({
          response: { status: 404 },
        });
      });

      it('should return 404 Not Found', () => {
        return request(app.getHttpServer())
          .get('/resources/foo')
          .expect('Content-Type', /json/)
          .expect(404);
      });
    });

    describe('preview mode', () => {
      describe('without any auth', () => {
        it('should return 403 Forbidden', async () => {
          // Precondition:
          expect(configService.get<string[]>('contentEditorEmails')).toEqual([]);

          await request(app.getHttpServer())
            .get('/resources/foo')
            .set('X-PREVIEW-MODE', 'true')
            .expect('Content-Type', /json/)
            .expect(403);

          expect(mockedStoryblokClient.mock.instances[0].getStory).not.toHaveBeenCalled();
        });
      });

      describe('with auth', () => {
        describe("when authed email isn't in list of allowed emails", () => {
          beforeEach(() => {
            mockConfigService(configService, 'contentEditorEmails', [otherEmail]);
          });

          it('should return 403 Forbidden', async () => {
            // Precondition:
            expect(configService.get<string[]>('contentEditorEmails')).toEqual([otherEmail]);

            await request(app.getHttpServer())
              .get('/resources/foo')
              .set('X-PREVIEW-MODE', 'true')
              .expect('Content-Type', /json/)
              .expect(403);

            expect(mockedStoryblokClient.mock.instances[0].getStory).not.toHaveBeenCalled();
          });
        });

        describe('when authed email is in list of allowed emails', () => {
          beforeEach(() => {
            mockConfigService(configService, 'contentEditorEmails', [userEmail]);

            const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

            mockGetStory(
              mockedStoryblokClientInstance,
              'foo',
              storyblokSingleResourceFixture,
              true,
            );
          });

          it('should return the draft resource', () => {
            // Precondition:
            expect(configService.get<string[]>('contentEditorEmails')).toEqual([userEmail]);

            return request(app.getHttpServer())
              .get('/resources/foo')
              .set('Authorization', `Bearer ${authToken}`)
              .set('X-PREVIEW-MODE', 'true')
              .expect('Content-Type', /json/)
              .expect(200, singleResourceFixture);
          });
        });
      });
    });
  });
});
