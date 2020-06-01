import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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

// URGH :(
function mockRichTextResolver(instance: StoryblokClient): void {
  instance.richTextResolver = {
    render: () => richTextPlaceholder,
  };
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

        mocked(mockedStoryblokClientInstance.getStories).mockResolvedValueOnce({
          data: { stories: [] },
          perPage: 0,
          total: 0,
          headers: null,
        });
      });

      it('should return an empty list', () => {
        return request(app.getHttpServer())
          .get('/resources')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect([]);
      });
    });

    describe('when resources do exist on Storyblok', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mocked(mockedStoryblokClientInstance.getStories).mockResolvedValueOnce({
          data: storyblokResourcesListFixture,
          perPage: 0,
          total: 0,
          headers: null,
        });

        mockRichTextResolver(mockedStoryblokClientInstance);
      });

      it('should return a list of resources', () => {
        return request(app.getHttpServer())
          .get('/resources')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(resourcesListFixture);
      });
    });
  });

  describe('GET /resources/:slug', () => {
    describe('when the resource exists', () => {
      beforeEach(() => {
        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mocked(mockedStoryblokClientInstance.getStory).mockResolvedValueOnce({
          data: storyblokSingleResourceFixture,
          headers: null,
        });

        mockRichTextResolver(mockedStoryblokClientInstance);
      });

      it('should return the resource', () => {
        return request(app.getHttpServer())
          .get('/resources/foo')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(singleResourceFixture);
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
