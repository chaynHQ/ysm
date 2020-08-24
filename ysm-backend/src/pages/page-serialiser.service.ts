import { Injectable } from '@nestjs/common';
import { StoryData } from 'storyblok-js-client';
import { Page } from './pages.types';

@Injectable()
export class PageSerialiserService {
  serialise(story: StoryData): Page {
    return {
      id: story.uuid,
      slug: story.slug,
      title: story.content.title,
      description: story.content.description,
      image: story.content.image,
      content: story.content.content,
    };
  }
}
