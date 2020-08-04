import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';
import { FilterOptions } from 'src/resources/filters.types';
import StoryblokClient, { StoriesParams } from 'storyblok-js-client';
import request from 'supertest';
import { mocked } from 'ts-jest/utils';
import { AppModule } from './../src/app.module';
import { resourcesListFixture, singleResourceFixture } from './fixtures/resources';
import {
  storyblokDatasourceEntriesCountriesFixture,
  storyblokResourcesListFixture,
  storyblokSingleResourceDisabledFixture,
  storyblokSingleResourceFixture,
  storyblokTagsFixture,
} from './fixtures/storyblok';

jest.mock('storyblok-js-client');
const mockedStoryblokClient = mocked(StoryblokClient, true);

function mockGetStories(
  instance: StoryblokClient,
  data: any,
  filterQuery?: any,
  tags?: string,
  searchTerm?: string,
): void {
  const params: StoriesParams = {
    starts_with: 'resources/',
    excluding_fields: 'content_items',
    version: 'draft',
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

function mockGetStory(instance: StoryblokClient, slug: string, data: any): void {
  when(mocked(instance.getStory)).expectCalledWith(`resources/${slug}`).mockResolvedValueOnce({
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

      const result: FilterOptions[] = [
        { title: 'Tags', field: 'tags', options: { Health: 'Health', Timeline: 'Timeline' } },
        {
          title: 'Countries',
          field: 'countries',
          options: { GLOBAL: 'Global', GB: 'United Kingdom' },
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
  });

  describe('GET /resources/:slug', () => {
    describe('when the resource exists and is enabled', () => {
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

    describe('when the resource exists but is not enabled', () => {
      let slug;

      beforeEach(() => {
        slug = 'foo';

        const mockedStoryblokClientInstance = mockedStoryblokClient.mock.instances[0];

        mockGetStory(mockedStoryblokClientInstance, slug, storyblokSingleResourceDisabledFixture);
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

      it('should return a 404 Not Found', () => {
        return request(app.getHttpServer())
          .get('/resources/foo')
          .expect('Content-Type', /json/)
          .expect(404);
      });
    });
  });
});
