import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import StoryblokClient from 'storyblok-js-client';
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
    // We have one type of filter available right now – countries – but expect more in the future.
    // At that point, we should refactor this into the FiltersService.
    const response = await this.storyblok.get('cdn/datasource_entries', {
      datasource: 'countries',
    });

    const options = response.data.datasource_entries.reduce((acc, e) => {
      acc[e.value] = e.name;
      return acc;
    }, {});

    return [
      {
        title: 'Countries',
        field: 'countries',
        options,
      },
    ];
  }

  async list(filters: Record<string, string>): Promise<Resource[]> {
    const response = await this.storyblok.getStories({
      starts_with: 'resources/',
      excluding_fields: 'content_items',
      filter_query: this.filtersService.mapFilters(filters),
      version: 'draft',
    });
    return response.data.stories.map((s) =>
      this.resourceSerialiserService.serialise(s, this.storyblok.richTextResolver),
    );
  }

  async get(slug: string): Promise<Resource> {
    try {
      const response = await this.storyblok.getStory(`resources/${slug}`, { version: 'draft' });
      return this.resourceSerialiserService.serialise(
        response.data.story,
        this.storyblok.richTextResolver,
      );
    } catch (e) {
      if (e.response?.status === 404) {
        throw new NotFoundException();
      }
      throw e;
    }
  }
}
