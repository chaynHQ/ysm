import { Test, TestingModule } from '@nestjs/testing';
import StoryblokClient from 'storyblok-js-client';
import { mocked } from 'ts-jest/utils';
import { STORYBLOK_CLIENT } from '../storyblok/storyblok-factory';
import { ThemeSerialiserService } from './theme-serialiser.service';
import { ThemesService } from './themes.service';

jest.mock('storyblok-js-client');
const mockedStoryblokClient = mocked(StoryblokClient, true);

describe('ThemesService', () => {
  let service: ThemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: STORYBLOK_CLIENT, useValue: mockedStoryblokClient },
        ThemeSerialiserService,
        ThemesService,
      ],
    }).compile();

    service = module.get<ThemesService>(ThemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
