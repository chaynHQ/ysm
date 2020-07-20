import { Injectable } from '@nestjs/common';
import { StoryData } from 'storyblok-js-client';
import { Theme } from './theme.types';

@Injectable()
export class ThemeSerialiserService {
  serialise(story: StoryData): Theme {
    return {
      id: story.uuid,
      slug: story.slug,
      title: story.name,
      description: story.content.description,
    };
  }
}
