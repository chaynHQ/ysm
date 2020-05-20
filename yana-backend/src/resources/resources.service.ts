import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import StoryblokClient from 'storyblok-js-client';

import { Resource } from './resource';
import { ResourceSerialiserService } from './resource-serialiser.service';

@Injectable()
export class ResourcesService {
  private readonly storyblok: StoryblokClient;

  constructor(
    private configService: ConfigService,
    private resourceSerialiserService: ResourceSerialiserService,
  ) {
    const storyblokToken = this.configService.get<string>('storyblok.token');
    this.storyblok = new StoryblokClient({
      accessToken: storyblokToken,
    });
  }

  async list(): Promise<Resource[]> {
    const response = await this.storyblok.getStories({
      starts_with: 'resources/',
      excluding_fields: 'content_items',
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
