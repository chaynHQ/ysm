import { Global, Module } from '@nestjs/common';
import { storyblokFactory, STORYBLOK_CLIENT } from './storyblok-factory';

@Global()
@Module({
  providers: [storyblokFactory],
  exports: [STORYBLOK_CLIENT],
})
export class StoryblokModule {}
