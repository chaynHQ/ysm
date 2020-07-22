import { Module } from '@nestjs/common';
import { storyblokFactory, STORYBLOK_CLIENT } from './storyblok-factory';

@Module({
  providers: [storyblokFactory],
  exports: [STORYBLOK_CLIENT],
})
export class StoryblokModule {}
