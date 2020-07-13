import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import StoryblokClient, { StoriesParams } from 'storyblok-js-client';
import { FiltersService } from './filters.service';
import { FilterOptions } from './filters.types';
import { ResourceSerialiserService } from './resource-serialiser.service';
import { Resource } from './resource.types';

@Injectable()
export class ResourcesService {
  private readonly storyblok: StoryblokClient;

  constructor(
    private configService: ConfigService,
    private filtersService: FiltersService,
    private resourceSerialiserService: ResourceSerialiserService,
  ) {
    const storyblokToken = this.configService.get<string>('storyblok.token');
    this.storyblok = new StoryblokClient({
      accessToken: storyblokToken,
    });
  }

  async filterOptions(): Promise<FilterOptions[]> {
    return this.filtersService.options(this.storyblok);
  }

  async list(filters: Record<string, string>, searchQuery: string): Promise<Resource[]> {
    const params: StoriesParams = {
      starts_with: 'resources/',
      excluding_fields: 'content_items',
      version: 'draft',
      ...this.buildRetrievalParamsForStoryblok(filters, searchQuery),
    };

    const response = await this.storyblok.getStories(params);
    return response.data.stories.map((s) => this.resourceSerialiserService.serialise(s));
  }

  async get(slug: string): Promise<Resource> {
    try {
      const response = await this.storyblok.getStory(`resources/${slug}`, { version: 'draft' });

      if (response.data.story.content.enabled) {
        return this.resourceSerialiserService.serialise(response.data.story);
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      if (e.response?.status === 404) {
        throw new NotFoundException();
      }
      throw e;
    }
  }

  private buildRetrievalParamsForStoryblok(
    filters: Record<string, string>,
    searchQuery: string,
  ): Partial<StoriesParams> {
    const params = {};

    const tagFilter = filters?.[this.filtersService.TAGS_FILTER_FIELD];
    if (tagFilter) {
      params['with_tag'] = tagFilter;
    }

    const filtersWithoutTags = { ...filters };
    delete filtersWithoutTags[this.filtersService.TAGS_FILTER_FIELD];
    params['filter_query'] = {
      ...this.filtersService.mapFilters(filtersWithoutTags),
      enabled: { is: true },
    };

    if (searchQuery) {
      params['search_term'] = searchQuery;
    }

    return params;
  }
}
