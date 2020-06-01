import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ResourceSerialiserService } from './resource-serialiser.service';
import { ResourcesService } from './resources.service';

describe('ResourcesService', () => {
  let service: ResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, ResourceSerialiserService, ResourcesService],
    }).compile();

    service = module.get<ResourcesService>(ResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
