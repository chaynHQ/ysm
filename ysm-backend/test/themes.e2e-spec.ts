import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';
import StoryblokClient, { StoriesParams } from 'storyblok-js-client';
import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { AppModule } from './../src/app.module';
import { storyblokThemesListFixture } from './fixtures/storyblok';
import { themesListFixture } from './fixtures/themes';

jest.mock('storyblok-js-client');
const mockedStoryblokClient = mocked(StoryblokClient, true);

function mockGetStories(instance: StoryblokClient, data: any): void {
  const params: StoriesParams = {
    starts_with: 'themes/',
    version: 'draft',
  };

  when(mocked(instance.getStories))
    .expectCalledWith(params)
    .mockResolvedValueOnce({ data, perPage: 0, total: 0, headers: null });
}

describe('Themes (e2e)', () => {
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
  });

  afterAll(async () => {
    await app.close();
  });
});
