import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';
import StoryblokClient from 'storyblok-js-client';
import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { AppModule } from './../src/app.module';
import {
  resourcesListFixture,
  richTextPlaceholder,
  singleResourceFixture,
} from './fixtures/resources';
import {
  storyblokResourcesListFixture,
  storyblokSingleResourceFixture,
} from './fixtures/storyblok';

jest.mock('storyblok-js-client');
const mockedStoryblokClient = mocked(StoryblokClient, true);

function mockRichTextResolver(instance: StoryblokClient): void {
  instance.richTextResolver = {
    render: () => richTextPlaceholder,
  };
}

function mockGetStories(instance: StoryblokClient, data: any, filter_query?: any): void {
  when(mocked(instance.getStories))
    .expectCalledWith({
      starts_with: 'resources/',
      filter_query,
      excluding_fields: 'content_items',
      version: 'draft',
    })
    .mockResolvedValueOnce({
      data,
      perPage: 0,
      total: 0,
      headers: null,
    });

  mockRichTextResolver(instance);
}

function mockGetStory(instance: StoryblokClient, slug: string, data: any): void {
  when(mocked(instance.getStory)).expectCalledWith(`resources/${slug}`).mockResolvedValueOnce({
    data,
    headers: null,
  });

  mockRichTextResolver(instance);
}

// This is just a sanity check.
it(`the STORYBLOK_TOKEN env var should not be a valid token`, () => {
  expect(process.env.STORYBLOK_TOKEN).toBe('noop');
});

describe('Resources (e2e)', () => {
  let app: INestApplication;

  beforeEach(() => {
    mockedStoryblokClient.mockClear();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // This is just a sanity check.
  it('should instantiate the StoryblokClient', () => {
    expect(mockedStoryblokClient).toHaveBeenCalledTimes(1);
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
        // NOTE: We don't test any actual filtering here. Just that the expected API call is made to Storyblok via the StoryblokClient. Therefore we can just use the resources list fixture to represent the filtered list.
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        const filters = {
          countries: { in_array: 'GB' },
        };

        mockGetStories(mockedStoryblokClientInstance, storyblokResourcesListFixture, filters);
      });

      it('should return the filtered list of resources', () => {
        return request(app.getHttpServer())
          .get('/resources?filters[countries]=GB')
          .expect('Content-Type', /json/)
          .expect(200, resourcesListFixture);
      });
    });
  });

  describe('GET /resources/:slug', () => {
    describe('when the resource exists', () => {
      let slug;

      beforeEach(() => {
        slug = 'foo';

        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mockGetStory(mockedStoryblokClientInstance, slug, storyblokSingleResourceFixture);
      });

      it('should return the resource', () => {
        return request(app.getHttpServer())
          .get(`/resources/${slug}`)
          .expect('Content-Type', /json/)
          .expect(200, singleResourceFixture);
      });
    });

    describe('when the resource does not exist', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mocked(mockedStoryblokClientInstance.getStory).mockRejectedValueOnce({
          response: { status: 404 },
        });
      });

      it('should return a 404 Not Found', () => {
        return request(app.getHttpServer())
          .get('/resources/foo')
          .expect('Content-Type', /json/)
          .expect(404);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
