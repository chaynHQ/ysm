import { Inject, Injectable } from '@nestjs/common';
import StoryblokClient, { StoriesParams } from 'storyblok-js-client';
import { STORYBLOK_CLIENT } from '../storyblok/storyblok-factory';
import { ThemeSerialiserService } from './theme-serialiser.service';
import { Theme } from './theme.types';

@Injectable()
export class ThemesService {
  constructor(
    @Inject(STORYBLOK_CLIENT) private storyblok: StoryblokClient,
    private themeSerialiserService: ThemeSerialiserService,
  ) {}

  async list(): Promise<Theme[]> {
    const params: StoriesParams = {
      starts_with: 'themes/',
      version: 'draft',
    };

    const response = await this.storyblok.getStories(params);
    return response.data.stories.map((s) => this.themeSerialiserService.serialise(s));
  }
}
