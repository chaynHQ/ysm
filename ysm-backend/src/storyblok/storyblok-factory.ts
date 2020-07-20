import { ConfigService } from '@nestjs/config';
import StoryblokClient from 'storyblok-js-client';

export const STORYBLOK_CLIENT = 'STORYBLOK_CLIENT';

export const storyblokFactory = {
  provide: STORYBLOK_CLIENT,
  useFactory: (configService: ConfigService): StoryblokClient => {
    const storyblokToken = configService.get<string>('storyblok.token');
    return new StoryblokClient({
      accessToken: storyblokToken,
    });
  },
  inject: [ConfigService],
};
