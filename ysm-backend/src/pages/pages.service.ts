import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import StoryblokClient from 'storyblok-js-client';
import { STORYBLOK_CLIENT } from '../storyblok/storyblok-factory';
import { PageSerialiserService } from './page-serialiser.service';
import { Page } from './pages.types';

@Injectable()
export class PagesService {
  constructor(
    @Inject(STORYBLOK_CLIENT) private storyblok: StoryblokClient,
    private pageSerialiserService: PageSerialiserService,
  ) {}

  async get(slug: string, previewMode: boolean): Promise<Page> {
    try {
      const response = await this.storyblok.getStory(`pages/${slug}`, {
        version: previewMode ? 'draft' : 'published',
      });

      return this.pageSerialiserService.serialise(response.data.story);
    } catch (e) {
      if (e.response?.status === 404) {
        throw new NotFoundException();
      }
      throw e;
    }
  }
}
