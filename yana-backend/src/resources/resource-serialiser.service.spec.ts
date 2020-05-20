import { Test, TestingModule } from '@nestjs/testing';
import { ResourceSerialiserService } from './resource-serialiser.service';

describe('ResourceSerialiserService', () => {
  let service: ResourceSerialiserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceSerialiserService],
    }).compile();

    service = module.get<ResourceSerialiserService>(ResourceSerialiserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
