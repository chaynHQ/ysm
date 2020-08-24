import { Test, TestingModule } from '@nestjs/testing';
import StoryblokClient from 'storyblok-js-client';
import { mocked } from 'ts-jest/utils';
import { STORYBLOK_CLIENT } from '../storyblok/storyblok-factory';
import { PageSerialiserService } from './page-serialiser.service';
import { PagesService } from './pages.service';

jest.mock('storyblok-js-client');
const mockedStoryblokClient = mocked(StoryblokClient, true);

describe('PagesService', () => {
  let service: PagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: STORYBLOK_CLIENT, useValue: mockedStoryblokClient },
        PageSerialiserService,
        PagesService,
      ],
    }).compile();

    service = module.get<PagesService>(PagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
